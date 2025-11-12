/**
 * ESLint Plugin: Product Quality Rules for EUROGRADE
 * Technical vehicle assessment service - Brand integrity and code quality enforcement
 */

module.exports = {
  rules: {
    // RULE 1: Enforce EUROGRADE brand colors only
    'use-styleguide-colors-only': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce only EUROGRADE brand colors: Deep Blue (#0E1B3D), Steel (#2B2F36), Technical Grey (#4A5568), Cool White (#F8FAFC)',
          category: 'Brand Integrity',
        },
        messages: {
          invalidColor: 'Use only EUROGRADE brand colors: #0E1B3D (Deep Blue), #2B2F36 (Steel), #4A5568 (Technical Grey), #F8FAFC (Cool White). Found: {{color}}',
        },
      },
      create(context) {
        // Base colors
        const DEEP_BLUE = [14, 27, 61]; // #0E1B3D
        const STEEL = [43, 47, 54]; // #2B2F36
        const TECH_GREY = [74, 85, 104]; // #4A5568
        const COOL_WHITE = [248, 250, 252]; // #F8FAFC
        const TEXT_PRIMARY = [26, 32, 44]; // #1A202C
        const BORDER = [203, 213, 224]; // #CBD5E0
        const WHITE = [255, 255, 255]; // #FFFFFF
        const BLACK = [0, 0, 0]; // #000000

        const isColorMatch = (r, g, b, target, tolerance = 5) => {
          return Math.abs(r - target[0]) <= tolerance &&
                 Math.abs(g - target[1]) <= tolerance &&
                 Math.abs(b - target[2]) <= tolerance;
        };

        const isBrandColor = (colorStr) => {
          // Allow CSS variables, transparent, inherit
          if (/var\(--/.test(colorStr) || ['transparent', 'currentcolor', 'inherit'].includes(colorStr.toLowerCase())) {
            return true;
          }

          // Allow hex colors
          const hexMatch = colorStr.match(/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/);
          if (hexMatch) {
            const hex = hexMatch[1].toLowerCase();
            if (hex.length === 3) {
              return ['0e1', '2b2', '4a5', 'f8f', 'fff', '000'].includes(hex);
            }
            return ['0e1b3d', '2b2f36', '4a5568', 'f8fafc', '1a202c', 'cbd5e0', 'ffffff', '000000'].includes(hex);
          }

          // Allow rgb/rgba colors with brand values
          const rgbaMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
          if (rgbaMatch) {
            const r = parseInt(rgbaMatch[1], 10);
            const g = parseInt(rgbaMatch[2], 10);
            const b = parseInt(rgbaMatch[3], 10);
            return isColorMatch(r, g, b, DEEP_BLUE) ||
                   isColorMatch(r, g, b, STEEL) ||
                   isColorMatch(r, g, b, TECH_GREY) ||
                   isColorMatch(r, g, b, COOL_WHITE) ||
                   isColorMatch(r, g, b, TEXT_PRIMARY) ||
                   isColorMatch(r, g, b, BORDER) ||
                   isColorMatch(r, g, b, WHITE) ||
                   isColorMatch(r, g, b, BLACK);
          }

          return false;
        };

        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              const colorRegex = /#[0-9A-Fa-f]{3,6}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)/g;
              const matches = node.value.match(colorRegex);

              if (matches) {
                matches.forEach(color => {
                  if (!isBrandColor(color)) {
                    context.report({
                      node,
                      messageId: 'invalidColor',
                      data: { color },
                    });
                  }
                });
              }
            }
          },
        };
      },
    },

    // RULE 2: Consistent company information
    'consistent-company-info': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Enforce consistent EUROGRADE company information',
          category: 'Brand Integrity',
        },
        messages: {
          invalidCompanyName: 'Use consistent company name: "EUROGRADE". Found: {{name}}',
          invalidEmail: 'Use official email: support@eurograde.eu. Found: {{email}}',
        },
      },
      create(context) {
        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              const value = node.value;

              // Ignore CSS variables, import paths, and technical strings
              if (value.startsWith('var(--') ||
                  value.startsWith('@/') ||
                  value.includes('components/') ||
                  value.includes('.tsx') ||
                  value.includes('.jsx') ||
                  value.includes('.js')) {
                return;
              }

              // Check for company name variations
              const companyRegex = /\beurograde\b/i;
              if (companyRegex.test(value)) {
                if (!/^EUROGRADE$/i.test(value.trim()) && value.length < 50) {
                  // Only flag if it's a short string (likely a brand mention)
                  const isInSentence = value.split(' ').length > 3;
                  if (!isInSentence) {
                    context.report({
                      node,
                      messageId: 'invalidCompanyName',
                      data: { name: value },
                    });
                  }
                }
              }

              // Check for email addresses
              const emailRegex = /@eurograde\./i;
              if (emailRegex.test(value) && !value.includes('support@eurograde.eu')) {
                context.report({
                  node,
                  messageId: 'invalidEmail',
                  data: { email: value },
                });
              }
            }
          },
        };
      },
    },

    // RULE 3: No broken internal links
    'no-broken-internal-links': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Verify all internal links exist in the routing structure',
          category: 'Navigation',
        },
        messages: {
          brokenLink: 'Internal link may be broken: {{link}}. Verify route exists.',
        },
      },
      create(context) {
        const KNOWN_ROUTES = [
          '/',
          '/contact',
          '/about',
          '/pricing',
          '/packages',
          '/faq',
          '/terms',
          '/login',
          '/register',
          '/dashboard',
          '/profile',
          '/requests',
          '/messages',
          '/checkout',
        ];

        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              const value = node.value;
              if (value.startsWith('/') && !value.startsWith('//') && !value.startsWith('http')) {
                const basePath = value.split('?')[0].split('#')[0];
                const isDynamic = basePath.includes('[') || basePath.includes(':');

                if (!isDynamic && !KNOWN_ROUTES.includes(basePath)) {
                  const isKnownPattern = KNOWN_ROUTES.some(route =>
                    basePath.startsWith(route + '/')
                  );

                  if (!isKnownPattern && basePath !== '/') {
                    context.report({
                      node,
                      messageId: 'brokenLink',
                      data: { link: value },
                    });
                  }
                }
              }
            }
          },
        };
      },
    },

    // RULE 4: No missing alt text on images
    'no-missing-alt-text': {
      meta: {
        type: 'problem',
        docs: {
          description: 'All images must have alt text for accessibility and SEO',
          category: 'Accessibility',
        },
        messages: {
          missingAlt: 'Image is missing alt text. Add descriptive alt attribute.',
          emptyAlt: 'Image has empty alt text. Provide description or use alt="" for decorative images only.',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'img' || node.name.name === 'Image') {
              const altAttr = node.attributes.find(
                attr => attr.type === 'JSXAttribute' && attr.name.name === 'alt'
              );

              if (!altAttr) {
                context.report({
                  node,
                  messageId: 'missingAlt',
                });
              } else if (
                altAttr.value &&
                altAttr.value.type === 'Literal' &&
                altAttr.value.value === ''
              ) {
                // Empty alt is OK for decorative images, but warn anyway
                context.report({
                  node,
                  messageId: 'emptyAlt',
                });
              }
            }
          },
        };
      },
    },

    // RULE 5: Icon buttons need aria-label
    'require-aria-label-on-icon-buttons': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Icon buttons must have aria-label for screen readers',
          category: 'Accessibility',
        },
        messages: {
          missingAriaLabel: 'Icon button is missing aria-label. Add descriptive label for screen readers.',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'button' || node.name.name === 'Button') {
              const hasAriaLabel = node.attributes.some(
                attr => attr.type === 'JSXAttribute' &&
                (attr.name.name === 'aria-label' || attr.name.name === 'ariaLabel')
              );

              const hasTextContent = node.parent.children?.some(
                child => child.type === 'JSXText' && child.value.trim()
              );

              // If button has no text content, it might be an icon button
              if (!hasTextContent && !hasAriaLabel) {
                context.report({
                  node,
                  messageId: 'missingAriaLabel',
                });
              }
            }
          },
        };
      },
    },

    // RULE 6: All forms must have onSubmit handler
    'no-form-without-submit': {
      meta: {
        type: 'problem',
        docs: {
          description: 'All forms must have onSubmit handler',
          category: 'User Experience',
        },
        messages: {
          missingOnSubmit: 'Form is missing onSubmit handler. Add form submission logic.',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'form') {
              const hasOnSubmit = node.attributes.some(
                attr => attr.type === 'JSXAttribute' && attr.name.name === 'onSubmit'
              );

              if (!hasOnSubmit) {
                context.report({
                  node,
                  messageId: 'missingOnSubmit',
                });
              }
            }
          },
        };
      },
    },

    // RULE 7: All buttons need onClick or href
    'no-button-without-handler': {
      meta: {
        type: 'problem',
        docs: {
          description: 'All buttons must have onClick or href attribute',
          category: 'User Experience',
        },
        messages: {
          missingHandler: 'Button is missing onClick handler or href. Add interaction logic.',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'button' || node.name.name === 'Button') {
              const hasHandler = node.attributes.some(
                attr => attr.type === 'JSXAttribute' &&
                (attr.name.name === 'onClick' || attr.name.name === 'href' ||
                 attr.name.name === 'type')
              );

              if (!hasHandler) {
                context.report({
                  node,
                  messageId: 'missingHandler',
                });
              }
            }
          },
        };
      },
    },

    // RULE 8: No generic placeholders
    'no-generic-placeholders': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Avoid generic placeholder text like "Lorem ipsum" or "TODO"',
          category: 'Content Quality',
        },
        messages: {
          genericPlaceholder: 'Generic placeholder found: {{text}}. Replace with specific content.',
        },
      },
      create(context) {
        const GENERIC_PATTERNS = [
          /lorem ipsum/i,
          /\btodo\b/i,
          /\bfixme\b/i,
          /placeholder text/i,
          /sample text/i,
          /test test/i,
          /asdf/i,
        ];

        return {
          Literal(node) {
            if (typeof node.value === 'string' && node.value.length > 3) {
              GENERIC_PATTERNS.forEach(pattern => {
                if (pattern.test(node.value)) {
                  context.report({
                    node,
                    messageId: 'genericPlaceholder',
                    data: { text: node.value.slice(0, 50) },
                  });
                }
              });
            }
          },
        };
      },
    },

    // RULE 9: Async buttons need loading state
    'require-loading-state-on-async-button': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Buttons with async onClick handlers should show loading state',
          category: 'User Experience',
        },
        messages: {
          missingLoadingState: 'Async button should have loading state feedback for users.',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'button' || node.name.name === 'Button') {
              const onClickAttr = node.attributes.find(
                attr => attr.type === 'JSXAttribute' && attr.name.name === 'onClick'
              );

              if (onClickAttr && onClickAttr.value) {
                const sourceCode = context.getSourceCode();
                const handlerCode = sourceCode.getText(onClickAttr.value);

                // Check if handler is async or contains await
                if (handlerCode.includes('async') || handlerCode.includes('await')) {
                  const hasLoadingProp = node.attributes.some(
                    attr => attr.type === 'JSXAttribute' &&
                    (attr.name.name === 'loading' || attr.name.name === 'isLoading' ||
                     attr.name.name === 'disabled')
                  );

                  if (!hasLoadingProp) {
                    context.report({
                      node,
                      messageId: 'missingLoadingState',
                    });
                  }
                }
              }
            }
          },
        };
      },
    },

    // RULE 10: Fetch calls need try-catch
    'require-try-catch-fetch': {
      meta: {
        type: 'problem',
        docs: {
          description: 'All fetch/API calls must be wrapped in try-catch',
          category: 'Error Handling',
        },
        messages: {
          missingTryCatch: 'Fetch/API call must be wrapped in try-catch for error handling.',
        },
      },
      create(context) {
        return {
          CallExpression(node) {
            if (
              (node.callee.name === 'fetch' ||
               (node.callee.object && node.callee.object.name === 'axios') ||
               (node.callee.property && node.callee.property.name === 'get') ||
               (node.callee.property && node.callee.property.name === 'post'))
            ) {
              // Check if call is inside a try block
              let parent = node.parent;
              let inTryCatch = false;

              while (parent) {
                if (parent.type === 'TryStatement') {
                  inTryCatch = true;
                  break;
                }
                parent = parent.parent;
              }

              if (!inTryCatch) {
                context.report({
                  node,
                  messageId: 'missingTryCatch',
                });
              }
            }
          },
        };
      },
    },

    // RULE 11: Use Next.js Image component
    'require-image-optimization': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Use Next.js Image component instead of <img> for optimization',
          category: 'Performance',
        },
        messages: {
          useNextImage: 'Use Next.js <Image> component instead of <img> for automatic optimization.',
        },
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            if (node.name.name === 'img') {
              context.report({
                node,
                messageId: 'useNextImage',
              });
            }
          },
        };
      },
    },

    // RULE 12: Empty states needed
    'require-empty-state': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Lists and data displays should have empty state handling',
          category: 'User Experience',
        },
        messages: {
          missingEmptyState: 'Add empty state handling for when {{name}} has no data.',
        },
      },
      create(context) {
        return {
          // Check for .map() calls without empty state check
          CallExpression(node) {
            if (
              node.callee.property &&
              node.callee.property.name === 'map' &&
              node.callee.object &&
              node.callee.object.name
            ) {
              const arrayName = node.callee.object.name;

              // Look for length check or empty state handling
              let parent = node.parent;
              let hasEmptyStateCheck = false;

              while (parent) {
                const sourceCode = context.getSourceCode();
                const parentText = sourceCode.getText(parent);

                if (
                  parentText.includes(`${arrayName}.length`) ||
                  parentText.includes(`${arrayName}?.length`) ||
                  parentText.includes('EmptyState') ||
                  parentText.includes('NoData')
                ) {
                  hasEmptyStateCheck = true;
                  break;
                }

                parent = parent.parent;
              }

              if (!hasEmptyStateCheck) {
                context.report({
                  node,
                  messageId: 'missingEmptyState',
                  data: { name: arrayName },
                });
              }
            }
          },
        };
      },
    },

    // RULE 13: Consistent payment provider (Stripe only)
    'consistent-payment-providers': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Use only Stripe for payment processing (EUROGRADE standard)',
          category: 'Business Logic',
        },
        messages: {
          invalidPaymentProvider: 'Use only Stripe for payments. Found: {{provider}}',
        },
      },
      create(context) {
        const INVALID_PROVIDERS = [
          'paypal',
          'square',
          'braintree',
          'authorize.net',
          'paddle',
        ];

        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              const lowerValue = node.value.toLowerCase();
              INVALID_PROVIDERS.forEach(provider => {
                if (lowerValue.includes(provider)) {
                  context.report({
                    node,
                    messageId: 'invalidPaymentProvider',
                    data: { provider },
                  });
                }
              });
            }
          },
          Identifier(node) {
            const lowerName = node.name.toLowerCase();
            INVALID_PROVIDERS.forEach(provider => {
              if (lowerName.includes(provider)) {
                context.report({
                  node,
                  messageId: 'invalidPaymentProvider',
                  data: { provider },
                });
              }
            });
          },
        };
      },
    },
  },
};

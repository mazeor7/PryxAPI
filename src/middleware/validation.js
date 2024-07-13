function validateRequest(schema) {
    return function(config) {
      if (!schema) return config;
  
      const errors = [];
  
      // Funzione helper per la validazione
      function validate(obj, schemaSection, path = '') {
        for (const [key, rule] of Object.entries(schemaSection)) {
          const value = obj[key];
          const fullPath = path ? `${path}.${key}` : key;
  
          if (rule.required && (value === undefined || value === null)) {
            errors.push(`${fullPath} is required`);
          } else if (value !== undefined && value !== null) {
            if (rule.type && typeof value !== rule.type) {
              errors.push(`${fullPath} must be of type ${rule.type}`);
            }
            if (rule.enum && !rule.enum.includes(value)) {
              errors.push(`${fullPath} must be one of [${rule.enum.join(', ')}]`);
            }
            if (rule.minLength && String(value).length < rule.minLength) {
              errors.push(`${fullPath} must be at least ${rule.minLength} characters long`);
            }
            if (rule.maxLength && String(value).length > rule.maxLength) {
              errors.push(`${fullPath} must be no more than ${rule.maxLength} characters long`);
            }
            if (rule.pattern && !rule.pattern.test(value)) {
              errors.push(`${fullPath} does not match the required pattern`);
            }
            if (typeof rule.validate === 'function') {
              const result = rule.validate(value);
              if (result !== true) {
                errors.push(`${fullPath}: ${result}`);
              }
            }
          }
        }
      }
  
      // Valida headers
      if (schema.headers) {
        validate(config.headers, schema.headers, 'headers');
      }
  
      // Valida params
      if (schema.params) {
        validate(config.params, schema.params, 'params');
      }
  
      // Valida data
      if (schema.data) {
        validate(config.data, schema.data, 'data');
      }
  
      if (errors.length > 0) {
        throw new Error('Validation failed: ' + errors.join('; '));
      }
  
      return config;
    };
  }
  
  module.exports = { validateRequest };
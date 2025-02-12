export const scanForMaliciousCode = (code, language) => {
  if (!code) {
    return { malicious: false, message: "No code provided" };
  }

  if (language === "python") {
    const patterns = [
      /os\.system\s*\(/i,
      /subprocess\./i,
      /__import__\s*\(/i,
      /eval\s*\(/i,
      /exec\s*\(/i,
      /socket\./i
    ];
    for (const pattern of patterns) {
      if (pattern.test(code)) {
        return {
          malicious: true,
          message: `Dangerous Python code detected`
        };
      }
    }
  } else if (language === "cpp") {
    const patterns = [
      /system\s*\(/i,
      /fork\s*\(/i,
      /exec\s*\(/i,
      /popen\s*\(/i,
      /getenv\s*\(/i
    ];
    for (const pattern of patterns) {
      if (pattern.test(code)) {
        return {
          malicious: true,
          message: `Dangerous C++ code detected`
        };
      }
    }
  } else {
    return { malicious: false, message: "Language not supported for scanning" };
  }

  return { malicious: false, message: "Code appears safe" };
};

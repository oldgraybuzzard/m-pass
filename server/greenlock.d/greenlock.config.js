module.exports = {
  packageRoot: __dirname,
  configDir: "./greenlock.d",
  subscriberEmail: "kfelder@melken-solutions.com",
  maintainerEmail: "kfelder@melken-solutions.com",
  agreeToTerms: true,
  cluster: false,
  sites: {
    "melken-solutions.com": {
      subject: "melken-solutions.com",
      altnames: ["www.melken-solutions.com"],
    },
  },
};

module.exports =  {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: 'Pick-A-Park API',
      version: '1.0.0',
      description:
        "Project of a smart parking app for SPM exam at University of Camerino a.y. 2019-2020",
      license: {
        name: "License MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
      contact: {
        name: "- Pick-A-Park email",
        email: "corrado.petrelli@studenti.unicam.it"
      },
      externalDocs: {
        description: "Wiki",
        url: "https://github.com/ByPassaRe/Pick-a-Park/wiki"
      }
    }
  },
  apis: ["../routes/**/*.js"]
};


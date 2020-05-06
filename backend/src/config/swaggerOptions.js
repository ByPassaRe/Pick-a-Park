module.exports =  {
    swaggerDefinition: {
        info: {
            title: 'Pick-A-Park API',
            version: '1.0.0',
            description:
              "Project of a smart parking app for SPM exam at University of Camerino",
            license: {
              name: "License MIT",
              url: "https://choosealicense.com/licenses/mit/"
            },
            contact: {
              name: "Corrado Petrelli",
              email: "corrado.petrelli@studenti.unicam.it"
            }
        },
        host: 'localhost:5000',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
		securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: require('path').resolve(__dirname, '..'), //app absolute path of parent
    files: ['./routes/**/*.js'], //Path to the API handle folder
};
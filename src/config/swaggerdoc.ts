import swaggerJSDoc from "swagger-jsdoc";

const port = process.env.PORT || 3000;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Gym",
            version: "1.0.0",
            description: "Simple Fitness Class Booking API"
        },
        servers : [{
           url: `http://localhost:${port}`} // or "/" (for the current API)
        ]
    },
    apis: ["./src/routes/routes"]
}

export const specs = swaggerJSDoc(options);
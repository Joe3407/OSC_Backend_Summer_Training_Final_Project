import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Gym Management API",
      version: "1.0.3",
      description: "API for managing gym members, trainers, classes, and bookings.",
    },

    servers: [
      {
        "url": "https://oscbackendsummertrainingfinalproject-production.up.railway.app",
        "description": "Production server",
      },
      {
        "url": "http://localhost:3000",
        "description": "Local server"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        RegisterUser: {
          type: "object",
          required: ["fullName", "email", "password", "role"],
          properties: {
            fullName: {
              type: "string",
              example: "Ahmed Ali",
            },
            email: {
              type: "string",
              format: "email",
              example: "ahmed@gmail.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "12345678",
            },
            role: {
              type: "string",
              example: "Member",
              description: "User role.",
            },
          },
        },

        LoginUser: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "ahmed@gmail.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "12345678",
            },
          },
        },

        CreateClass: {
          type: "object",
          required: ["title", "trainer", "timeSlot", "capacity"],
          properties: {
            title: {
              type: "string",
              example: "Morning Yoga",
            },
            trainer: {
              type: "string",
              example: "64f123456789abcdef123456",
              description: "ID of the trainer.",
            },
            timeSlot: {
              type: "string",
              example: "10:00 AM - 11:00 AM",
            },
            capacity: {
              type: "integer",
              example: 20,
            },
          },
        },

        UpdateClass: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Advanced Yoga",
            },
            trainer: {
              type: "string",
              example: "64f123456789abcdef123456",
            },
            timeSlot: {
              type: "string",
              example: "12:00 PM - 1:00 PM",
            },
            capacity: {
              type: "integer",
              example: 25,
            },
          },
        },

        CreateBooking: {
          type: "object",
          properties: {
            session: {
              type: "string",
              example: "  ",
              description: "ID of the class to book.",
            },
            member: {
              type: "string",
              example: " ",
              description: "ID of the member making the booking.",
            },
          },
        },
      },
    },
  },

  apis: ["./src/config/swaggerdoc.ts"],
};

const specs = {
  ...swaggerJsdoc(options),

  paths: {
    "/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterUser",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User created successfully",
          },
          "400": {
            description: "User already exists or invalid data",
          },
          "500": {
            description: "Registration failed",
          },
        },
      },
    },

    "/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginUser",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful. Returns a JWT token.",
          },
          "401": {
            description: "Invalid email or password",
          },
          "500": {
            description: "Login failed",
          },
        },
      },
    },

    "/classes": {
      post: {
        tags: ["Classes"],
        summary: "Create a new class",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateClass",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Class created successfully",
          },
          "401": {
            description: "Authentication required",
          },
          "403": {
            description: "Only trainers can create classes",
          },
          "500": {
            description: "Failed to create class",
          },
        },
      },

      get: {
        tags: ["Classes"],
        summary: "Get all classes",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "List of classes",
          },
          "401": {
            description: "Authentication required",
          },
          "403": {
            description: "Only members can view classes",
          },
          "500": {
            description: "Failed to get classes",
          },
        },
      },
    },

    "/classes/{id}": {
      get: {
        tags: ["Classes"],
        summary: "Get a class by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Class ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Class found",
          },
          "404": {
            description: "Class not found",
          },
          "500": {
            description: "Failed to get class",
          },
        },
      },

      put: {
        tags: ["Classes"],
        summary: "Update a class",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Class ID",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateClass",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Class updated successfully",
          },
          "404": {
            description: "Class not found",
          },
          "500": {
            description: "Failed to update class",
          },
        },
      },

      delete: {
        tags: ["Classes"],
        summary: "Delete a class",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Class ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Class deleted successfully",
          },
          "404": {
            description: "Class not found",
          },
          "500": {
            description: "Failed to delete class",
          },
        },
      },
    },

    "/bookings": {
      post: {
        tags: ["Bookings"],
        summary: "Create a booking",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateBooking",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Booking created successfully",
          },
          "401": {
            description: "Authentication required",
          },
          "403": {
            description: "Only members can create bookings",
          },
          "500": {
            description: "Failed to create booking",
          },
        },
      },
    },

    "/bookings/{id}/cancel": {
      patch: {
        tags: ["Bookings"],
        summary: "Cancel a booking",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Booking ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Booking cancelled successfully",
          },
          "401": {
            description: "Authentication required",
          },
          "403": {
            description: "Only members can cancel bookings",
          },
          "404": {
            description: "Booking not found",
          },
          "500": {
            description: "Failed to cancel booking",
          },
        },
      },
    },
  },
};

export default specs;
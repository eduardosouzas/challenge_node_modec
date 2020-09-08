import { object } from "yup";

const openApi = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Vessel and Equipment API',
    description: 'Vessel and Equipment management API',
    contact: {
      name: 'Carioca Devs Team',
      email: 'eduardomail@gmail.com',
      url: 'https://www.cariocadevs.dev/'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:3333/',
      description: 'Local server'
    },
  ],
  tags: [
    {
      name: 'CRUD operations'
    }
  ],
  paths: {
    '/vessel': {
      get: {
        tags: ['CRUD oprations'],
        description: 'Get all vessels',
        oprationdId: 'index',
        parameters:[],
        response: {
          '200': {
            description: 'Vessels were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/vessels'
                }
              }
            }
          }
        }
      },
    post: {
      tags: ['CRUD operations'],
      description: 'Create Vessel',
      operationId: 'store',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/vessel'
            }
          }
        },
        required: true,
      },
      response: {
        '200': {
          description: 'New Vessel where created',
        },
        '400': {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/errors'
              }
            }
          }
        }
      }
    }
    },
    '/equipment/inactive': {
      put: {
        tags: ['CRUD operations'],
        description: 'Inactive array | one Equipament',
        operationId: 'inactive',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/equipment_status'
              }
            }
          },
          required: true,
        },
        response: {
          '200': {
            description: 'New Equipament where created',
          },
          '400': {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errors'
                }
              }
            }
          }
        }
      },
    },
    '/equipment': {
      get: {
        tags: ['CRUD oprations'],
        description: 'Get all equipment',
        oprationdId: 'index',
        parameters:[],
        response: {
          '200': {
            description: 'equipments were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/equipments'
                }
              }
            }
          }
        }
      },
    post: {
      tags: ['CRUD operations'],
      description: 'Create Equipament',
      operationId: 'store',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/equipment',
            }
          }
        },
        required: true,
      },
      response: {
        '200': {
          description: 'New Equipament where created',
        },
        '400': {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/errors'
              }
            }
          }
        }
      }
    }
    },
  },
  components: {
    schemas: {
      vessel_id: {
        type: 'string',
        description: 'Code reference for vessel',
        example: 'MV102'
      },
      equipment_codes: {
        type: 'object',
        description: 'Object for update status equipment',
        properties: {
          code: {
            type: 'string',
            description: 'code external to equipment',
            example: '5310B9D7'
          }
        }
      },
      equipment: {
        type: 'object',
        properties: {
          status: {
            type: 'boolean',
            description: 'equipment availability status',
            example: true | false,
          },
          name: {
            type: 'string',
            description: 'name equipment',
            example: 'Engine',
          },
          code: {
            type: 'string',
            description: 'external equipment code',
            example: 'Engine',
          },
          location: {
            type: 'string',
            description: 'equipment location',
            example: 'Brazil',
          },
          vessel_id: {
            $ref: '#/components/schemas/vessel_id',
          }
        }
      },
      vessel: {
        type: 'object',
        description: 'representation of the vessel',
        properties: {
          code: {
            type: 'string',
            description: 'external vessel code',
            example: 'MV102'
          },
          equipments: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/equipment'
            }
          }
        }
      },
      vessels: {
        type: 'object',
        properties: {
          vessels: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/vessel'
            }
          }
        }
      },
      equipment_status: {
        type: 'object',
        properties: {
          equipments: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/equipment_codes'
            }
          }
        }
      },
      equipments: {
        type: 'object',
        properties: {
          equipments: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/equipment'
            }
          }
        }
      },
      errors: {
        type: 'object',
        description: 'response of error',
        properties: {
          error: {
            type: 'string',
            description: 'message erro',
            example: 'invalid parameters'
          }
        }
      }
    }
  }
};
export default openApi;

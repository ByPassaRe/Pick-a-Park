const rolesArray = [
  "DRIVER", 
  "MUNICIPALITY_EMPLOYEE", 
  "MUNICIPALITY_POLICE", 
  "PARKING_COMPANY"
];

Object.freeze(rolesArray);


module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username: {
          type: String,
          required: true,
          validate: {
            validator: (v) => {
              // Alphanumeric string that may include _ and – having a length of 3 to 30 characters
              return /^[a-z0-9_-]{3,30}$/.test(v);
            },
            message: props => `${props.value} is not a valid username!`
          },
        },
        password: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true,
          validate: {
            validator: (v) => {
              // Email regex
              return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
          },
        },
        role: {
            type: String,
            enum: rolesArray,
            default: rolesArray[0],
            validate: {
              validator: (v) => {
                //check if v is a role included in rolesArray
                return rolesArray.includes(v);
              },
              message: props => `${props.value} is not a valid role!`
            },
        }
        
      },
      { timestamps: true }
    );
    
    const User = mongoose.model("user", schema);
    return User;
  };
  
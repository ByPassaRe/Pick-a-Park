const mongoose = require('mongoose');
const argon2 = require('argon2');

//Immutable array
const rolesArray = [
  "DRIVER", 
  "MUNICIPALITY_EMPLOYEE", 
  "MUNICIPALITY_POLICE", 
  "PARKING_COMPANY"
];
Object.freeze(rolesArray);


UserSchema = mongoose.Schema(
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
    

UserSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();
  }

  if (this.password.length < 8) {
    var err = new mongoose.Error.ValidationError(null);
    err.addError('password', new mongoose.Error.ValidatorError({ message: 'invalid', path: 'password', value: 'value' })); 
    throw err;
  }

	this.password = await argon2.hash(this.password);
});



const User = mongoose.model("User", UserSchema);

module.exports = User;
  
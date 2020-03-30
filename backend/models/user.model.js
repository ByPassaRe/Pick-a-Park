module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        username: String,
        password: String,
        email: String,
        role: {
            type: String,
            enum: [
                    "DRIVER", 
                    "MUNICIPALITY_EMPLOYEE", 
                    "MUNICIPALITY_POLICE", 
                    "PARKING_COMPANY"
                ],
            default: "DRIVER"
        }
        
      },
      { timestamps: true }
    );
  
    const User = mongoose.model("user", schema);
    return User;
  };
  
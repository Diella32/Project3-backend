module.exports = (sequelize, DataTypes) => {
    const Education = sequelize.define('Education', {
        education_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Assuming 'Users' is the name of the user table
                key: 'id'
            }
        },
        FieldOfStudy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        institution: {
            type: DataTypes.STRING,
            allowNull: false
        },
        degree: {
            type: DataTypes.STRING
        },
        start_date: {
            type: DataTypes.DATE
        },
        end_date: {
            type: DataTypes.DATE
        },
        gpa: {
            type: DataTypes.DECIMAL(3, 2)
        },
        resume_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Resumes', // Assuming 'Resumes' is the name of the resume table
                key: 'id'
            }
        }
    }, {
        timestamps: true // Enables createdAt and updatedAt automatically
    });
  
    return Education;
  };
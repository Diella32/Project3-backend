module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define('request', {
        requestId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        dateMade: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        approvedBy: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'Open',
            validate: {
                isIn: [['Open', 'Approved', 'Rejected']]
            }
        },
        resumeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Resumes',
                key: 'resume_id'
            }
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'user_id'
            }
        }
    }, {
        timestamps: false
    });

    Request.associate = (models) => {
        Request.belongsTo(models.Resume, {
            foreignKey: 'resumeId',
            as: 'resume'
        });
        Request.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    };

    return Request;
}
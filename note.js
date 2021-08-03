// Thêm vào bảng nối ==============================================================================
UserProject = sequelize.define('user_project', {
   role: Sequelize.STRING,
});
User.belongsToMany(Project, { through: UserProject });
Project.belongsToMany(User, { through: UserProject });
// through is required!

user.addProject(project, { through: { role: 'manager' } });

//Lấy bảng nối ====================================================================================

Order.findAll({
   where: {
      userId: userId,
   },
   include: [
      {
         model: Item,
         as: 'item',
         through: { attributes: ['count'] }, // this may not be needed
      },
   ],
}).then((orders) => {
   console.log(orders);
   res.status(200).json(orders);
});
//Create junction table with the same Model ==========================================================================================
models.User.hasMany(models.AudioConfig, {
   as: 'createdByUser',
   foreignKey: {
      name: 'createdBy',
      allowNull: false,
   },
});
models.User.hasMany(models.AudioConfig, {
   as: 'updatedByUser',
   foreignKey: {
      name: 'updatedBy',
   },
});
models.AudioConfig.belongsTo(models.User, {
   as: 'createdByUser',
   foreignKey: {
      name: 'createdBy',
      allowNull: false,
   },
});
models.AudioConfig.belongsTo(models.User, {
   as: 'updatedByUser',
   foreignKey: {
      name: 'updatedBy',
   },
});
// ============================================
User.belongsToMany(models.User, {
   as: 'friends',
   foreignKey: 'user_id',
   through: UsersFriends,
});
User.belongsToMany(models.User, {
   as: 'userFriends',
   foreignKey: 'friend_id',
   through: UsersFriends,
});

// UsersFriends
module.exports = (sequelize, DataTypes) => {
   const TaskSparePart = sequelize.define(
      'UsersFriends',
      {
         user_id: DataTypes.BIGINT,
         friend_id: DataTypes.BIGINT,
         created_at: DataTypes.DATE,
         updated_at: DataTypes.DATE,
      },
      {
         tableName: 'users_friends',
      },
   );
   return UsersFriends;
};

// To get friends
module.exports.getFriends = async (req, res) => {
   try {
      const user = await db.User.findOne({
         where: {
            id: req.user.id,
         },
         include: 'friends',
      });
      if (!user) throw new Error('User not found!');
      res.send(user.friends);
   } catch (error) {
      res.send(error.message);
   }
};
//=============================================
function FollowingModel(sequelize, DataTypes) {
   const Following = sequelize.define(
      'Following',
      {
         follower_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
               model: 'Users',
               key: 'id',
            },
         },
         following_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
               model: 'Users',
               key: 'id',
            },
         },
      },
      {
         timestamps: true,
         underscored: true,
         updatedAt: false,
      },
   );

   return Following;
}

module.exports = FollowingModel;

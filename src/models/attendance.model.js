const AttendanceModel = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      allowNull:false,
    },
    status:{
      type: DataTypes.ENUM('Present', 'Absent'),
      allowNull: false
    },
    empId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  },{
    indexes: [
      {
        unique: true,
        fields: ['empId', 'date']
      }
    ]
  });

  return Attendance;
};

module.exports = AttendanceModel;

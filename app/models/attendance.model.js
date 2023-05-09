const AttendanceModel = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // empId:{
    //   type:DataTypes.INTEGER,
    //   allowNull:false,
    // },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status:{
      type: DataTypes.ENUM('Present', 'Absent'),
      allowNull: false
    }
  });

  return Attendance;
};

module.exports = AttendanceModel;

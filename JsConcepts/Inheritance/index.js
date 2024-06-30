class College {
  constructor(name) {
      this.name = name;
      this.departments = {};
  }

  addDepartment(departmentName) {
      if (!this.departments[departmentName]) {
          this.departments[departmentName] = {
              subjects: {},
              teachers: []
          };
      } else {
          console.log(`Department ${departmentName} already exists.`);
      }
  }

  addSubject(departmentName, subjectName) {
      if (this.departments[departmentName]) {
          this.departments[departmentName].subjects[subjectName] = [];
      } else {
          console.log(`Department ${departmentName} does not exist.`);
      }
  }

  addTeacher(departmentName, teacherName) {
      if (this.departments[departmentName]) {
          this.departments[departmentName].teachers.push(teacherName);
      } else {
          console.log(`Department ${departmentName} does not exist.`);
      }
  }
}

class Student extends College {
  constructor(collegeName, studentName) {
      super(collegeName);
      this.studentName = studentName;
      this.department = '';
      this.subjects = [];
  }

  enrollDepartment(departmentName) {
      if (this.departments[departmentName]) {
          this.department = departmentName;
      } else {
          console.log(`Department ${departmentName} does not exist.`);
      }
  }

  enrollSubject(subjectName) {
      if (this.department && this.departments[this.department].subjects[subjectName]) {
          this.subjects.push(subjectName);
      } else {
          console.log(`Subject ${subjectName} does not exist in department ${this.department}.`);
      }
  }
}

// Example usage:
const myCollege = new College('My College');
myCollege.addDepartment('Computer Science');
myCollege.addSubject('Computer Science', 'Algorithms');
myCollege.addTeacher('Computer Science', 'Prof. John Doe');

const student1 = new Student('My College', 'Alice');
student1.addDepartment('Computer Science');
student1.addSubject('Computer Science', 'Algorithms');
student1.addTeacher('Computer Science', 'Prof. John Doe');

student1.enrollDepartment('Computer Science');
student1.enrollSubject('Algorithms');

console.log(student1);

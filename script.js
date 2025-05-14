// Класи
class PersonalInfo {
    constructor(name, email, age) {
      this.name = name;
      this.email = email;
      this.age = parseInt(age);
    }
  }
  
  class Education {
    constructor(description) {
      this.description = description;
    }
  }
  
  class Experience {
    constructor(description) {
      this.description = description;
    }
  }
  
  class Skills {
    constructor(skillString) {
      this.skills = skillString.split(',').map(skill => skill.trim());
    }
  }
  
  class Resume {
    constructor(personalInfo, education, experience, skills) {
      this.personalInfo = personalInfo;
      this.education = education;
      this.experience = experience;
      this.skills = skills;
    }
  
    render() {
      return `
        <h2>${this.personalInfo.name}</h2>
        <p><strong>Email:</strong> ${this.personalInfo.email}</p>
        <p><strong>Вік:</strong> ${this.personalInfo.age}</p>
        <hr/>
        <h3>Освіта</h3>
        <p>${this.education.description}</p>
        <h3>Досвід роботи</h3>
        <p>${this.experience.description}</p>
        <h3>Навички</h3>
        <ul>${this.skills.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
      `;
    }
  }
  
  // Обробка форми
  document.getElementById('resumeForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('age').value.trim();
    const education = document.getElementById('education').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const skills = document.getElementById('skills').value.trim();
  
    if (!name || !email || !age || isNaN(age) || !education || !experience || !skills) {
      alert('Будь ласка, заповніть усі поля коректно.');
      return;
    }
  
    const resume = new Resume(
      new PersonalInfo(name, email, age),
      new Education(education),
      new Experience(experience),
      new Skills(skills)
    );
  
    document.getElementById('resumeOutput').innerHTML = resume.render();
    localStorage.setItem('savedResume', JSON.stringify(resume));
  });
  
  // Відновлення з localStorage
  window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('savedResume');
    if (saved) {
      const data = JSON.parse(saved);
      const resume = new Resume(
        new PersonalInfo(data.personalInfo.name, data.personalInfo.email, data.personalInfo.age),
        new Education(data.education.description),
        new Experience(data.experience.description),
        new Skills(data.skills.skills.join(', '))
      );
      document.getElementById('resumeOutput').innerHTML = resume.render();
    }
  });
  
  // Очистити localStorage
  document.getElementById('clearBtn').addEventListener('click', () => {
    localStorage.removeItem('savedResume');
    document.getElementById('resumeOutput').innerHTML = '';
    document.getElementById('resumeForm').reset();
  });
  

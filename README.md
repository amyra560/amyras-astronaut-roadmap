# 🚀 Astronaut Career Roadmap Website

A beautiful, interactive website to help you plan and track your journey to becoming an astronaut. This project provides a comprehensive roadmap with all the essential steps needed to pursue a career in space exploration.

## ✨ Features

- **Interactive Progress Tracking**: Check off completed tasks and see your progress in real-time
- **Beautiful Space Theme**: Animated starry background with modern glass-morphism design
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Progress Statistics**: Visual representation of your overall progress
- **Local Storage**: Your progress is automatically saved in your browser
- **Motivational Messages**: Encouraging notifications when you complete tasks
- **Confetti Celebrations**: Fun animations when you complete entire phases
- **Resource Section**: Helpful tips and resources for each career phase

## 🎯 Career Phases Included

1. **Education Foundation**
   - Bachelor's Degree (Engineering/Science)
   - Master's Degree (Aerospace/Physics)
   - PhD (Optional but recommended)

2. **Professional Experience**
   - Engineering Experience (3+ years)
   - Research Experience
   - Leadership Roles

3. **Physical Training**
   - Excellent Physical Fitness
   - Swimming Certification
   - Scuba Diving Certification

4. **Aviation Experience**
   - Pilot License (Commercial)
   - 1000+ Flight Hours
   - Jet Aircraft Experience

5. **Application Process**
   - NASA Astronaut Application
   - ESA Astronaut Application
   - Private Space Company Applications

6. **Selection & Training**
   - Pass Selection Interviews
   - Basic Astronaut Training
   - Mission-Specific Training

## 🚀 How to Use

### Getting Started

1. **Open the Website**: Simply open `index.html` in your web browser
2. **Start Planning**: Begin with the first phase (Education Foundation)
3. **Track Progress**: Check off tasks as you complete them
4. **Monitor Statistics**: Watch your overall progress and completed phases
5. **Use Resources**: Refer to the helpful tips and resources section

### Features Guide

- **Checkboxes**: Click on any task checkbox to mark it as complete
- **Progress Bars**: Each phase shows your completion percentage
- **Statistics**: Real-time updates of your overall progress
- **Phase Activation**: Complete a phase to unlock the next one
- **Reset Button**: Use the reset button in the bottom-right corner to start over

## 🛠️ Customization

### Adding New Tasks

To add new tasks to any phase, edit the HTML file:

```html
<label class="task">
    <input type="checkbox" data-task="your-task-name">
    <span>Your new task description</span>
</label>
```

### Modifying Phases

To add a new phase, copy this structure:

```html
<div class="phase" data-phase="your-phase-name">
    <div class="phase-icon">
        <i class="fas fa-your-icon"></i>
    </div>
    <h3>Your Phase Title</h3>
    <p>Phase description</p>
    <div class="progress-bar">
        <div class="progress" style="width: 0%"></div>
    </div>
    <div class="tasks">
        <!-- Add your tasks here -->
    </div>
</div>
```

### Changing Colors

The main color scheme uses these CSS variables in `styles.css`:

```css
/* Primary colors */
--primary-color: #4ecdc4;
--secondary-color: #45b7d1;
--accent-color: #ff6b6b;
--success-color: #96ceb4;
```

### Adding New Resources

To add resources, edit the resources section in the HTML:

```html
<div class="resource-card">
    <h3><i class="fas fa-your-icon"></i> Your Resource Title</h3>
    <ul>
        <li>Your resource item</li>
        <li>Another resource item</li>
    </ul>
</div>
```

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🎨 Design Features

- **Glass-morphism Effect**: Modern translucent design elements
- **Animated Background**: Twinkling stars effect
- **Smooth Animations**: Hover effects and transitions
- **Gradient Text**: Animated gradient title
- **Responsive Grid**: Adapts to different screen sizes
- **Custom Scrollbar**: Themed scrollbar design

## 🔧 Technical Details

### Files Structure
```
astronaut-roadmap/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with animations
- **JavaScript**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Orbitron, Roboto)

### Key JavaScript Features
- Local storage for progress persistence
- Real-time progress calculation
- Animated number counters
- Confetti celebrations
- Scroll animations
- Keyboard navigation support

## 🌟 Tips for Success

1. **Start Early**: Begin your education and training as early as possible
2. **Stay Fit**: Maintain excellent physical condition throughout your journey
3. **Network**: Connect with professionals in the aerospace industry
4. **Stay Updated**: Keep up with the latest developments in space exploration
5. **Be Persistent**: The astronaut selection process is highly competitive
6. **Multiple Paths**: Consider both government agencies and private companies

## 📚 Additional Resources

### Official Websites
- [NASA Astronaut Selection](https://www.nasa.gov/astronauts)
- [ESA Astronaut Selection](https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Astronauts)
- [SpaceX Careers](https://www.spacex.com/careers)

### Educational Resources
- [MIT OpenCourseWare](https://ocw.mit.edu/)
- [Khan Academy Physics](https://www.khanacademy.org/science/physics)
- [Coursera Aerospace Courses](https://www.coursera.org/browse/engineering/aerospace-engineering)

## 🤝 Contributing

Feel free to customize this roadmap for your specific needs! You can:

- Add more specific tasks for your situation
- Modify the phases to match your country's requirements
- Add local resources and programs
- Customize the design to your preferences

## 📄 License

This project is open source and available under the MIT License.

---

**Dream big, reach for the stars! 🌟**

*Remember: Every astronaut started with a dream and took it one step at a time.* 
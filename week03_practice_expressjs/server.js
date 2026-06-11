// server.js
import express from 'express';
import courses from "./course.js";
import { logger } from "./logger.js";
import { validateQuery } from "./validateQuery.js";
import { auth } from "./auth.js";

const app = express();
const PORT = 3000;

app.use(logger);
// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', validateQuery , auth ,(req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    if (minCredits && maxCredits && Number(minCredits) > Number(maxCredits)) {
        return res.status(400).json({ error: "minCredits cannot be greater than maxCredits" });
    }
    const filterCourses = courses.filter(course => {
        if(course.department !== dept){
            return false;
        }
        if (level && course.level !== level){
            return false;
        }
        if (minCredits && course.credits < Number(minCredits)){
            return false;
        }
        if(maxCredits && course.credits > Number(maxCredits)){
            return false;
        }
        if(semester && course.semester !== semester){
            return false;
        }
        if(instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())){
            return false;
        }
        return true;
    });
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    res.json({
        results: filterCourses,
        meta: {
            total: filterCourses.length
        }
    });    
});

app.get('/' , (req , res) => {
    res.send("hello motherfather!!")    
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

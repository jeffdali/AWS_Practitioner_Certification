
import os
import json
import re

def parse_md(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract Title
    title_match = re.search(r'^# (.*)', content, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else "Untitled Lesson"
    
    # Split content and questions
    # Questions usually start after "## 🧠 Exam Sample Questions"
    parts = re.split(r'## 🧠 Exam Sample Questions', content)
    lesson_body = parts[0].strip()
    questions_section = parts[1] if len(parts) > 1 else ""
    
    # Parse questions
    questions = []
    if questions_section:
        # Questions are separated by ---
        q_blocks = re.split(r'---', questions_section)
        for block in q_blocks:
            block = block.strip()
            if not block or "### Question" not in block:
                continue
            
            # Extract question text
            q_text_match = re.search(r'\*\*(.*?)\*\*', block)
            if not q_text_match:
                continue
            question_text = q_text_match.group(1).strip()
            
            # Extract options
            options = re.findall(r'- ([A-E]\) .*?)[\n\r]', block)
            
            # Extract answer
            ans_match = re.search(r'\*\*✅ Correct Answer[s]?:\s*(.*?)\*\*', block)
            answer = ans_match.group(1).strip() if ans_match else ""
            
            # Extract explanation
            exp_match = re.search(r'> \*\*Explanation:\*\* (.*)', block, re.DOTALL)
            explanation = exp_match.group(1).strip() if exp_match else ""
            
            questions.append({
                "question": question_text,
                "options": options,
                "answer": answer,
                "explanation": explanation
            })
            
    return {
        "title": title,
        "content": lesson_body,
        "questions": questions
    }

lessons = []
lessons_dir = 'lessons'
files = sorted([f for f in os.listdir(lessons_dir) if f.endswith('.md')])
for i, f in enumerate(files):
    lesson_path = os.path.join(lessons_dir, f)
    lesson_data = parse_md(lesson_path)
    lesson_data["id"] = f"lesson-{i+1:02d}"
    lessons.append(lesson_data)

with open('src/lessons.json', 'w', encoding='utf-8') as f:
    json.dump(lessons, f, indent=2)

print("lessons.json created successfully")

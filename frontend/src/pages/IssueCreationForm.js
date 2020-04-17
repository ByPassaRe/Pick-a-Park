import React, {useState} from 'react';
import axios from 'axios';

function IssueCreationForm() {
    const [issue, setIssue] = useState({});

    const handleCorrectData = async () => {
    
        try {
          const response = await axios.post('http://localhost:5000/issues', {  text: issue.text})
            response.status === 200 ? alert('Issue Created succesfully') : alert(response);
        } catch (err) {
          alert(err);
        }
      };

    const handleSubmit = () => {
    
        handleCorrectData();
    }
    return (
        <div>
            Issue:
      <input type="text" name="text" onChange={(e) => setIssue({...issue,text: e.target.value})} />
            <button onClick={handleSubmit}>Create Issue</button>
        </div>
    );
}

export default IssueCreationForm;
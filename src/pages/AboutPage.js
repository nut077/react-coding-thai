import { useState, useEffect } from 'react';
import axios from 'axios';

const AboutPage = () => {
  const [version, setVersion] = useState();

  useEffect(() => {
    axios
      .get('https://api.codingthailand.com/api/version')
      .then((res) => setVersion(res.data.data.version))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <h2>เกี่ยวกับเรา</h2>
          {version && <p>Backend API version {version}</p>}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

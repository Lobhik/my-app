import React, { useEffect, useState } from 'react';
import './Form.css';

const Form = ({ cities }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAssembly, setSelectedAssembly] = useState('');
  const [assemblies, setAssemblies] = useState([]);
  const [assemblyNumbers, setAssemblyNumbers] = useState([]);
  const [selectedAssemblyNo, setSelectedAssemblyNo] = useState(''); // Added missing state variable
  const [villages, setVillages] = useState([]);
  ///
  const [firstname, setName] = useState("");
  const [message, setMessage] = useState("");
  const [usersdata, setUsersdata] = useState("");

  ///

  const getAssemblies = async (city) => {
    try {
      let url = `http://13.48.67.44/user/city?ct=${city}&l=0`;
      const res = await fetch(url);
      const responseData = await res.json();
      const assembliesData = responseData.data;

      // Filter unique assemblies and remove duplicates
      const uniqueAssemblies = Array.from(new Set(assembliesData.map(item => item.assembly)));

      setAssemblies(uniqueAssemblies);
    } catch (error) {
      console.log(error);
    }
  };

  const getAssemblyNumbers = async (city, assembly) => {
    try {
      let url = `http://13.48.67.44/user/city?ct=${city}&l=0`;
      const res = await fetch(url);
      const responseData = await res.json();
      const assembliesData = responseData.data;

      // Filter unique assembly numbers for the selected assembly
      const uniqueAssemblyNumbers = Array.from(
        new Set(
          assembliesData
            .filter(item => item.assembly === assembly)
            .map(item => item.assembly_no)
        )
      );

      setAssemblyNumbers(uniqueAssemblyNumbers);
    } catch (error) {
      console.log(error);
    }
  };

  const getVillagesByAssembly = async (city, assemblyNo) => {
    try {
      let url = `http://13.48.67.44/user/city?ct=${city}&ac=${assemblyNo}&l=0`;
      const res = await fetch(url);
      const responseData = await res.json();
      const villagesData = responseData.data;

      setVillages(villagesData);
    } catch (error) {
      console.log(error);
    }
  };
  ///
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data##",firstname)
    try {
      let res = await fetch("http://127.0.0.1:5000/user/details", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          },
         // mode:'cors',
        body: JSON.stringify({
          name_en: firstname,
          assembly_no: 70
        }),
      });
      console.log("first##",res)
      let resJson = await res.json();
      console.log("response##",resJson)
      setUsersdata(resJson)
      if (res.status === 200) {
        setName("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  /////


  useEffect(() => {
    if (selectedCity) {
      getAssemblies(selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCity && selectedAssembly) {
      getAssemblyNumbers(selectedCity, selectedAssembly);
    }
  }, [selectedCity, selectedAssembly]);

  useEffect(() => {
    if (selectedCity && selectedAssemblyNo) {
      // Fetch villages by assembly number and city
      getVillagesByAssembly(selectedCity, selectedAssemblyNo);
    }
  }, [selectedCity, selectedAssemblyNo]);

  const handleCityChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCity(selectedValue);
    setSelectedAssembly(''); // Clear selected assembly
    setSelectedAssemblyNo(''); // Clear selected assembly number
    setAssemblyNumbers([]); // Clear assembly numbers
    setVillages([]); // Clear villages
  };

  const handleAssemblyChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAssembly(selectedValue);
    setSelectedAssemblyNo(''); // Clear selected assembly number
    setVillages([]); // Clear villages
  };
  useEffect(() => {
    console.log("Villages data:", villages); // Add this line to check if villages are being fetched.
  }, [villages]);

  const handleAssemblyNoChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedAssemblyNo(selectedValue);
    setVillages([]); // Clear villages
  };
  console.log("usersttttt",usersdata)
  return (
    <div>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <br />
      <div className="search-form">
        <h1>Enter Search Details</h1>
        <form>
          <div className='form-group'>
            {/* State dropdown */}
            <select className="text-box" id="state" name="state">
              <option value="">Maharashtra</option>
            </select>
            {/* City dropdown */}
            <select
              className="text-box"
              id="city"
              name="city"
              onChange={handleCityChange}
            >
              <option value="">City</option>
              {cities.map((data) => (
                <option key={data.id} value={data.district}>
                  {data.district}
                </option>
              ))}
            </select>
            {/* Assemblies dropdown */}
            <select
              className="text-box"
              id="assembly"
              name="assembly"
              onChange={handleAssemblyChange}
            >
              <option value="">Assembly</option>
              {assemblies.map((assembly, index) => (
                <option key={index} value={assembly}>
                  {assembly}
                </option>
              ))}
            </select>
            {/* Assembly Numbers dropdown */}
            <select
              className="text-box"
              id="assemblyNo"
              name="assemblyNo"
              onChange={handleAssemblyNoChange}
            >
              <option value="">Assembly No</option>
              {assemblyNumbers.map((assemblyNo, index) => (
                <option key={index} value={assemblyNo}>
                  {assemblyNo}
                </option>
              ))}
            </select>
            <select className="text-box" id="village" name="village">
              <option value="">Village</option>
              {villages.map((villageData) => (
                <option key={villageData.id} value={villageData.name}>
                  {villageData.village}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            {/* <input type="text" placeholder="First Name" className="text-box"  onChange={handleFirstNameChange} value={firstName} /><br /><br /> */}
            <input type="text" placeholder="First Name" className="text-box"  name="firstName" value={firstname} onChange={(e) => setName(e.target.value)}  /><br /><br />

          </div>
          <div className='form-group'>
            <input type="text" placeholder="Last Name" className="text-box"  name="lastName"  /><br /><br />
          </div>
          <div className="form-group">
            <button type="submit" onClick={handleSubmit} className="search-button">Search</button>
          </div>
          {/* TEST*/}

          
          <div>
            {usersdata ? (
              <table>
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    
                    <th>Name</th>
                    <th>Village Name</th>
                    <th>District</th>
                    {/* Add more headers based on your data structure */}
                  </tr>
                </thead>
                <tbody>
                  {usersdata.map(item => (
                    <tr key={item.id}>
                      {/* <td>{item.id}</td> */}
                      <td>{item.name_en}</td>
                      <td>{item.village_name}</td>
                      <td>{item.district}</td>
                      {/* Add more cells based on your data structure */}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Loading...</p>
            )}
          </div>

        {/*END TEST*/}
        </form>
      </div>
    </div>
  );
};

export default Form;

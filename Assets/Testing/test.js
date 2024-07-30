// function fetchData(callback) {
//     setTimeout(() => {
//       console.log("Data fetched");
//       callback();
//     }, 2000);
//   }
//   console.log("Dloading ");
//   function processData() {
//     console.log("Processing data");
//   }
  
//   fetchData(processData);

//await asynchronous
function fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Data fetched");
      }, 2000);
    });
  }
  
  async function processData() {
    try {
      const data = await fetchData();
      console.log(data);
      console.log("Processing data");
    } catch (error) {
      console.log(error);
    }
  }
  
  processData();
  
  
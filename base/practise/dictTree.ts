import * as https from 'https';

const getData = () => {
  return new Promise(resolve => {
    https.get('https://randomuser.me/api/?results=5000&inc=gender,email,phone,cell,nat', (res) => {
      let html;
      res.on('data', (data) => {
        html += data;
      });
      res.on('end', () => {
        resolve(html);
      });
    });
  });
};

export const dictTree = async () => {
  const data = getData();
  data.then(res => {
    console.log(1);
    data.then(x => {
      console.log(2)
    });
  });
  return data;
};

dictTree();
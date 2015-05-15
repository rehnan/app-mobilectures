var ml = {};
//ml.config = { url: 'https://mobilectures.herokuapp.com' };
ml.config = { url: 'http://localhost:1337'};

ml.session = window.sessionStorage;
ml.session.setItem("listener", null);
ml.session.setItem("authorization", false);



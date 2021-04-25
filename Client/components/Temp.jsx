// const React = require('react');
// import Widget from "./AudioWidget.jsx";
// import { Link } from 'react-router-dom';
// import AudioRecorder from './AudioRecorder.jsx';

// class Search extends React.Component {

//     constructor(props){
//         super(props);
//         this.state = {
//             name: '',
//             pronArray: []
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         this.setState({name: event.target.value.toLowerCase(), pronArray: []});
//     }

//     handleSubmit(event) {
//         event.preventDefault();
//         // console.log(this.name)
//         // alert('A name was submitted: ' + this.state.name);
//         // const { name } = this.state;
//         // console.log(name)
//         const urlName = '';
//         fetch(`/api/aname?search=${this.state.name}`)
//             .then((response) => response.json())
//             .then((data) => this.setState({pronArray: data}))
//             .catch((err) => alert('Sorry this api doesn\'t have this name'))
//     }

//     createTable() {
//         const table = [];
//         for(let i = 0; i < this.state.pronArray.length; i++){
//             let { name_id, name, path, lang_name, name_phonetic } = this.state.pronArray[i];
//             table.push(
//                 <Widget name_id={name_id} name={name} path={path} lang_name={lang_name} name_phonetic={name_phonetic} />
//             )
//         }
//         return table;
//     }

//     render() {
//         return (
//             <div className="searchDiv">
//                 <form onSubmit={this.handleSubmit}>
//                     <label>
//                         <input type="submit" className="searchBar" type="text" onChange={this.handleChange} placeholder="No, its..."/>
//                     </label>
//                     {/* <input type="submit" value="Search"/> */}
//                 </form>
//                 <div className="homeLinks">
//                     {/* <Link to="/saved"><button id="savedButton" type="button">Saved Searches</button></Link>
//                     <Link to="/record"><button id="recordButton" type="button">Practice</button></Link> */}
//                 </div>
//                 {this.createTable()}
//             </div>
//     )};
// }


// export default Search;
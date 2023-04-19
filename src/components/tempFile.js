// import React from "react";
// import "./Player.css";
// import { useSelector, useDispatch } from "react-redux";
// import { setCurrentSong } from "../store/audioSlice";

// const Player = () => {
//   const audioList = useSelector((state) => state.audio.audioList);
//   const currentSong = useSelector((state) => state.audio.currentSong);
//   const dispatch = useDispatch();

//   const handleSongClick = (song) => {
//     dispatch(setCurrentSong(song));
//   };

//   return (
//     <>
//       <div className="player">
//         <div className="dashboard">
//           <header>
//             <h4>Now playing:</h4>
//             <h2>{currentSong ? currentSong.name : "No song selected"}</h2>
//           </header>
//           <div className="cd">
//             <div
//               className="cd-thumb"
//               style={{ backgroundImage: `url(${currentSong?.image})` }}
//             ></div>
//           </div>

//           <div className="control">
//             <div className="btn btn-repeat">
//               <i className="fas fa-redo"></i>
//             </div>
//             <div className="btn btn-prev">
//               <i className="fas fa-step-backward"></i>
//             </div>
//             <div className="btn btn-toggle-play">
//               <i className="fas fa-pause icon-pause"></i>
//               <i className="fas fa-play icon-play"></i>
//             </div>
//             <div className="btn btn-new">
//               <i className="fas fa-step-forward"></i>
//             </div>
//             <div className="btn btn-random">
//               <i className="fas fa-random"></i>
//             </div>
//           </div>

//           <input
//             id="progress"
//             className="progress"
//             type="range"
//             value="0"
//             step="0.1"
//             min="0"
//             max="100"
//           />

//           <audio id="audio" src=""></audio>
//         </div>

//         <div className="playlist">
//           {audioList &&
//             audioList.map((audio, index) => (
//               <div
//                 key={index}
//                 className="song"
//                 onClick={() => handleSongClick(audio)}
//               >
//                 <div className="thumb">
//                   <img src={audio.image} alt="Quran Pak" />
//                 </div>
//                 <div className="body">
//                   <h3 className="title">{audio.name}</h3>
//                   <p className="author">{audio.description}</p>
//                 </div>
//                 <div className="option">
//                   <i className="fas fa-ellipsis-h"></i>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Player;
const usetube = require('usetube'),
fs = require('fs');

const getPlaylistVideos = async (playlist_id) => {
    const playlist = await usetube.getPlaylistVideos(playlist_id,{thumbnail:true})
    return playlist
}
/*
(async()=>{

    const playlist_id = `PLn5htlE50QUor90lbF-WWpEYB_ZI1RqPW`
    const res = await usetube.getPlaylistVideos(playlist_id)
    console.log(res)
    // write this to a json file
    fs.writeFileSync('playlist.json', JSON.stringify(res, null, 2))
})()
*/
module.exports = getPlaylistVideos
const videoA = {
    id: '1',
    title: 'Gravity Falls',
    duration: 1337,
    watched: true,
};

const videoB = {
    id: '2',
    title: 'Back to the Future II',
    duration: 1337,
    watched: true,
};

const videos = [videoA, videoB];

const getVideoById = (id) => new Promise((resolve) => {
    const [video] = videos.filter((video) => {
        return video.id === id;
    });

    resolve(video);
});

exports.getVideoById = getVideoById;
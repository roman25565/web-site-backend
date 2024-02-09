import PostModel from '../models/Post.js'


export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: 'не вдалося дістати всі статі попробуйте пізніше',
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                returnDocument: 'after',
            }
            , (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        massage: 'не вдалося дістати статю попробуйте пізніше',
                    });
                }

                if (!doc) {
                    return res.status(404).json({ message: 'Статя не знайдена' })
                }

                res.json(doc);
            }).populate('user')
    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: 'не вдалося дістати статю попробуйте пізніше',
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndDelete({
            _id: postId,
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    massage: 'не вдалося дістати статю попробуйте пізніше',
                });
            }

            if (!doc) {
                return res.status(404).json({ message: 'Статя не знайдена' })
            }

            res.json({ success: true });
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: 'не вдалося дістати статю попробуйте пізніше',
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            text: req.body.text,
        });

        const post = await doc.save()

        res.json({ post })
    } catch (err) {
        console.log(err)
        res.status(401).json({
            massage: 'не вдалося створити статю попробуйте пізніше',
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
            });
        res.json({ success: true });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            massage: 'не вдалося оновити статю попробуйте пізніше',
        })
    }
}
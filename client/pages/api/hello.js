// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    console.log('pass middleware here +++++++ 111');

    res.status(200).json({ name: 'John Doe' })
}

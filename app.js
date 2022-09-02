const express = require("express");

const app = express();

//开放静态资源
app.use("/node_modules", express.static("./node_modules"));

// 解析html,要引入express-art-template
app.engine("html", require("express-art-template"));

// 配置body-parser,用来解析post来的信息
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const messageArr = [
	{
		id: 0,
		message: "小红",
		time: "2022-9-1",
	},
	{
		id: 1,
		message: "小明",
		time: "2022-9-1",
	},
	{
		id: 2,
		message: "小刚",
		time: "2022-9-1",
	},
	{
		id: 3,
		message: "小相",
		time: "2022-9-1",
	},
];

app.get("/index.html", (req, res) => {
	const newArr=messageArr.slice().reverse()
	res.render("index.html",{newArr});
});

app.post("/sub-message", (req, res) => {
	console.log(req.body);
		const newMessage={
        id:messageArr[messageArr.length-1].id+1,
        message:req.body.message,
        time:new Date().toLocaleDateString().replace(/\//g,'-')
		}	
	messageArr.push(newMessage)
	res.send(true)
});

app.post("/getMessageLength",(req,res)=>{
	res.send(messageArr.length+'')
});




app.listen(3000, () => console.log("loading..."));

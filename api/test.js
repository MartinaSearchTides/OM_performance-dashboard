module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.status(200).json({ 
    ok: true, 
    message: "API is working!",
    timestamp: new Date().toISOString()
  });
}

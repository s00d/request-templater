
const templates = {
"swift/urlsession": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n// Create a new URLRequest object\nvar request = URLRequest(url: URL(string: \"")
    ; __append( url )
    ; __append("\")!)\n\n// Set the request method\nrequest.httpMethod = \"")
    ; __append( method )
    ; __append("\"\n\n// Set the request content type header\nrequest.addValue(\"")
    ; __append( mimeType )
    ; __append("\", forHTTPHeaderField: \"Content-Type\")\n\n")
    ;  if (headers.length > 0) { 
    ; __append("\n// Add headers to the request\n")
    ;  headers.forEach(header => { 
    ; __append("\nrequest.addValue(\"")
    ; __append(escapeFn( header.value ))
    ; __append("\", forHTTPHeaderField: \"")
    ; __append(escapeFn( header.name ))
    ; __append("\")\n")
    ;  }) 
    ;  } 
    ; __append("\n\n")
    ;  if (cookies.length > 0) { 
    ; __append("\n// Add cookies to the request\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\nrequest.addValue(\"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\", forHTTPHeaderField: \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\")\n")
    ;  }) 
    ;  } 
    ; __append("\n\n")
    ;  if (method === 'POST' && postData.length > 0) { 
    ; __append("// Set the request body\n")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\nlet fileUrl = URL(fileURLWithPath: \"/path/to/file\")\nlet data = try Data(contentsOf: fileUrl)\nrequest.httpBody = data\n")
    ;  } else { 
    ; __append("\nlet postDataDict = ")
    ; __append(escapeFn(
JSON.stringify(postData.reduce((acc, param) => {
    if (Array.isArray(param.value) || typeof param.value === 'object') {
        acc[param.name] = param.value
    } else {
        acc[param.name] = param.value
    }
    return acc
}, {}))
))
    ; __append("\nlet postData = postDataDict.map { (key, value) -> String in\nlet encodedKey = key.addingPercentEncoding(withAllowedCharacters: .alphanumerics) ?? \"\"\nlet encodedValue = String(describing: value).addingPercentEncoding(withAllowedCharacters: .alphanumerics) ?? \"\"\nreturn \"(encodedKey)=(encodedValue)\"\n}.joined(separator: \"&\")\nlet postDataEncoded = postData.data(using: .utf8)\nrequest.httpBody = postDataEncoded\n")
    ;  } 
    ;  } 
    ; __append("\n\n// Create a new URLSession object\nlet session = URLSession.shared\n\n// Send the request\nlet task = session.dataTask(with: request) { (data, response, error) in\nguard let data = data else { return }\nprint(\"Response:\", String(data: data, encoding: .utf8)!)\n}\n\ntask.resume()\n")
  return __output;

},
"swift/alamofire": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n// Construct the request URL\nlet fullUrl = \"")
    ; __append( url )
    ; __append("\"\n\n// Set up the request headers\nvar headers: HTTPHeaders = [:]\n")
    ;  headers.forEach(header => { 
    ; __append("\nheaders[\"")
    ; __append(escapeFn( header.name ))
    ; __append("\"] = \"")
    ; __append(escapeFn( header.value ))
    ; __append("\"\n")
    ;  }) 
    ; __append("\n\n")
    ;  if (cookies.length > 0) { 
    ; __append("\n// Add cookies to the request\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\nlet cookie = HTTPCookie(properties: [\n    .domain: \"")
    ; __append(escapeFn( cookie.domain ))
    ; __append("\",\n    .path: \"")
    ; __append(escapeFn( cookie.path ))
    ; __append("\",\n    .name: \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\",\n    .value: \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\",\n])!\nHTTPCookieStorage.shared.setCookie(cookie)\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n// Set up the request parameters\nvar parameters: Parameters = [:]\n")
    ;  postData.forEach(param => { 
    ; __append("\n")
    ;  if (Array.isArray(param.value) || typeof param.value === 'object') { 
    ; __append("\nif let jsonData = try? JSONSerialization.data(withJSONObject: ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(", options: []) {\n    if let jsonString = String(data: jsonData, encoding: .utf8) {\n        parameters[\"")
    ; __append(escapeFn( param.name ))
    ; __append("\"] = jsonString\n    }\n}\n")
    ;  } else { 
    ; __append("\nparameters[\"")
    ; __append(escapeFn( param.name ))
    ; __append("\"] = \"")
    ; __append(escapeFn( param.value ))
    ; __append("\"\n")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n\n// Create the request\nAF.request(fullUrl, method: .")
    ; __append(escapeFn( method.toLowerCase() ))
    ; __append(", parameters: parameters, headers: headers).response { response in\n    switch response.result {\n    case .success(let data):\n        if let data = data {\n            print(\"Response:\", String(data: data, encoding: .utf8)!)\n        }\n    case .failure(let error):\n        print(\"Error:\", error.localizedDescription)\n    }\n}\n")
  return __output;

},
"scala/scalaj-http": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport scalaj.http._\n\nval url = \"")
    ; __append(escapeFn( url ))
    ; __append("\"\nval method = \"")
    ; __append(escapeFn( method ))
    ; __append("\"\nval mimeType = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\nval headers = ")
    ;  if (headers.length > 0) { 
    ; __append("Seq(\n")
    ;  headers.forEach(header => { 
    ; __append("\n  (\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\"),\n")
    ;  }) 
    ; __append("\n)")
    ;  } else { 
    ; __append("Nil")
    ;  } 
    ; __append("\nval cookies = ")
    ;  if (cookies.length > 0) { 
    ; __append("Seq(\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n  HttpCookie(\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\", \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\"),\n")
    ;  }) 
    ; __append("\n)")
    ;  } else { 
    ; __append("Nil")
    ;  } 
    ; __append("\nval postData = ")
    ;  if (postData.length > 0) { 
    ; __append("Seq(\n")
    ;  postData.forEach(param => { 
    ; __append("\n")
    ;  if (Array.isArray(param.value) || typeof param.value === 'object') { 
    ; __append("\n  (\"")
    ; __append(escapeFn( param.name ))
    ; __append("\", \"")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append("\"),\n")
    ;  } else { 
    ; __append("\n  (\"")
    ; __append(escapeFn( param.name ))
    ; __append("\", \"")
    ; __append(escapeFn( param.value ))
    ; __append("\"),\n")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n)")
    ;  } else { 
    ; __append("Nil")
    ;  } 
    ; __append("\n\n// Construct the request\nval request = Http(url).method(method)\n  .headers(headers)\n  .cookies(cookies)\n  .timeout(connTimeoutMs = 10000, readTimeoutMs = 60000)\n  .option(HttpOptions.followRedirects(true))\n\n// Add request body if needed\nif (postData.nonEmpty) {\n  val entity = ")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n    MultipartFormData(Seq(\n      ")
    ;  postData.forEach(param => { 
    ; __append("\n        FileData(\"")
    ; __append(escapeFn( param.name ))
    ; __append("\", new java.io.File(\"")
    ; __append(escapeFn( param.value ))
    ; __append("\"))\n      ")
    ;  }) 
    ; __append("\n    )).toEntity\n  ")
    ;  } else { 
    ; __append("\n    HttpConstants.writePostData(postData).getBytes(\"UTF-8\")\n  ")
    ;  } 
    ; __append("\n  request.postData(entity, mimeType)\n}\n\n// Send the request\nval response = request.asString\n\n// Handle the response\nif (response.isSuccess) {\n  println(\"Response: \" + response.body)\n} else {\n  println(\"Error: \" + response.code + \" \" + response.statusLine)\n}\n")
  return __output;

},
"scala/http4s": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport cats.effect._\nimport org.http4s._\nimport org.http4s.client.blaze._\nimport org.http4s.client.dsl.io._\nimport org.http4s.headers._\nimport org.http4s.MediaType._\n\nval url = \"")
    ; __append(escapeFn( url ))
    ; __append("\"\nval method = \"")
    ; __append(escapeFn( method ))
    ; __append("\"\nval mimeType = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\nval headers = ")
    ;  if (headers.length > 0) { 
    ; __append("Headers(\n")
    ;  headers.forEach(header => { 
    ; __append("\n  Header.apply(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\"),\n")
    ;  }) 
    ; __append("\n)")
    ;  } else { 
    ; __append("Headers.empty")
    ;  } 
    ; __append("\nval cookies = ")
    ;  if (cookies.length > 0) { 
    ; __append("Seq(\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n  RequestCookie(\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\", \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\"),\n")
    ;  }) 
    ; __append("\n)")
    ;  } else { 
    ; __append("Seq.empty")
    ;  } 
    ; __append("\nval postData = ")
    ;  if (postData.length > 0) { 
    ; __append("UrlForm(\n")
    ;  postData.forEach(param => { 
    ; __append("\n")
    ;  if (Array.isArray(param.value) || typeof param.value === 'object') { 
    ; __append("\n  \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" -> \"")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append("\",\n")
    ;  } else { 
    ; __append("\n  \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" -> \"")
    ; __append(escapeFn( param.value ))
    ; __append("\",\n")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n)")
    ;  } else { 
    ; __append("UrlForm.empty")
    ;  } 
    ; __append("\n\n// Construct the request\nimplicit val cs = IO.contextShift(ExecutionContext.global)\nval client = Http1Client[IO]().unsafeRunSync()\nval request = Method.")
    ; __append(escapeFn( method.toUpperCase() ))
    ; __append("(Uri.unsafeFromString(url), postData)\n  .withHeaders(headers)\n  .withCredentials(Credentials(cookies))\n\n// Send the request\nval response = client.expect[String](request).unsafeRunSync()\n\n// Handle the response\nprintln(\"Response: \" + response)\n\n// Clean up\nclient.shutdownNow()\n")
  return __output;

},
"scala/akka": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport akka.actor.ActorSystem\nimport akka.http.scaladsl.Http\nimport akka.http.scaladsl.model._\nimport akka.stream.ActorMaterializer\nimport akka.stream.scaladsl._\nimport scala.concurrent.Future\nimport scala.util.{Failure, Success}\n\nval url = \"")
    ; __append(escapeFn( url ))
    ; __append("\"\nval method = \"")
    ; __append(escapeFn( method ))
    ; __append("\"\nval mimeType = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\nval headers = List(\n")
    ;  headers.forEach(header => { 
    ; __append("\n  HttpHeader.parse(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\").asInstanceOf[HttpHeader],\n")
    ;  }) 
    ; __append("\n)\nval cookies = List(\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n  HttpCookiePair(\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\", \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\").asInstanceOf[HttpCookiePair],\n")
    ;  }) 
    ; __append("\n)\nval postData = List(\n")
    ;  postData.forEach(param => { 
    ; __append("\n  ")
    ;  if (Array.isArray(param.value) || typeof param.value === 'object') { 
    ; __append("\n    FormData.BodyPart.Strict(\"")
    ; __append(escapeFn( param.name ))
    ; __append("\", HttpEntity(ContentTypes.application/json, \"")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append("\")).asInstanceOf[FormData.BodyPart.Strict],\n  ")
    ;  } else { 
    ; __append("\n    FormData.BodyPart.Strict(\"")
    ; __append(escapeFn( param.name ))
    ; __append("\", \"")
    ; __append(escapeFn( param.value ))
    ; __append("\").asInstanceOf[FormData.BodyPart.Strict],\n  ")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n)\n\n// Construct the request\nimplicit val system = ActorSystem()\nimplicit val materializer = ActorMaterializer()\nimplicit val executionContext = system.dispatcher\n\nval request = HttpRequest(\n  method = HttpMethods.")
    ; __append(escapeFn( method.toUpperCase() ))
    ; __append(",\n  uri = url,\n  headers = headers,\n  entity = ")
    ;  if (postData.length > 0) { 
    ; __append("FormData(postData).toEntity")
    ;  } else { 
    ; __append("HttpEntity.Empty")
    ;  } 
    ; __append("\n).addCredentials(cookies)\n\n// Send the request\nval responseFuture: Future[HttpResponse] = Http().singleRequest(request)\n\n// Handle the response\nresponseFuture.onComplete {\n  case Success(response) =>\n    response.entity.dataBytes.runWith(Sink.fold(\"\")(_ + _.utf8String))\n      .onComplete {\n        case Success(responseBody) => println(\"Response: \" + responseBody)\n        case Failure(ex) => println(\"Failed to get response body: \" + ex.getMessage)\n      }\n  case Failure(ex) => println(\"Error: \" + ex.getMessage)\n}\n")
  return __output;

},
"rust/surf": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nuse surf::http::{Method, Url, headers::{Headers, HeaderValue}};\n\n// Construct the request URL\nlet url = Url::new(\"")
    ; __append(escapeFn( url ))
    ; __append("\").unwrap();\n\n// Set up the request\nlet mut req = surf::Request::new(")
    ; __append(escapeFn( method ))
    ; __append(" , url);\n\n")
    ;  if (headers.length > 0) { 
    ; __append("\n// Add headers to the request\n")
    ;  headers.forEach(header => { 
    ; __append("\nreq.insert_header(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", HeaderValue::from_str(\"")
    ; __append(escapeFn( header.value ))
    ; __append("\").unwrap());\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  if (cookies.length > 0) { 
    ; __append("\n// Add cookies to the request\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\nreq.insert_cookie(surf::http::Cookie::new(\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\", \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\"));\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  if (postData.length > 0) { 
    ; __append("\n// Send the request\nlet body = ")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\nsurf::Body::from(surf::http::Form::from(")
    ;  postData[0].value 
    ; __append("))\n")
    ;  } else { 
    ; __append("\nsurf::Body::from(\"")
    ; __append(escapeFn( postData.map(param => {
if (Array.isArray(param.value) || typeof param.value === 'object') {
    return param.name + '=' + encodeURIComponent(JSON.stringify(param.value))
} else {
    return param.name + '=' + encodeURIComponent(param.value)
}
}).join('&') ))
    ; __append("\")\n")
    ;  } 
    ; __append(";\nreq.set_body(body);\n")
    ;  } 
    ; __append("\n\n// Send the request and handle the response\nlet res = async {\n    let mut res = req.await?;\n    let body = res.body_string().await?;\n    println!(\"Response: {}\", body);\n    Ok(())\n}.await;\n\n// Handle errors\nif let Err(err) = res {\n    eprintln!(\"Error: {}\", err);\n}\n")
  return __output;

},
"rust/reqwest": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nlet url = \"")
    ; __append(escapeFn( url ))
    ; __append("\";\nlet method = \"")
    ; __append(escapeFn( method ))
    ; __append("\";\nlet mime_type = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\";\n\nlet headers = reqwest::header::HeaderMap::new();\n")
    ;  headers.forEach(header => { 
    ; __append("\nheaders.insert(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\".parse().unwrap());\n")
    ;  }) 
    ; __append("\n\nlet mut cookies = reqwest::cookie::CookieJar::new();\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\ncookies.add(reqwest::cookie::Cookie::new(\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\", \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\"));\n")
    ;  }) 
    ; __append("\n\nlet mut request_builder = reqwest::Client::new().request(method, url);\nrequest_builder = request_builder.headers(headers);\nrequest_builder = request_builder.cookie_store(cookies);\n\n// Add post data to the request\n")
    ;  if (postData.length > 0) { 
    ; __append("\n")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\nlet form_data = reqwest::multipart::Form::new()\n.file(\"")
    ; __append(escapeFn( postData[0].name ))
    ; __append("\", \"")
    ; __append(escapeFn( postData[0].value ))
    ; __append("\").unwrap();\nlet request_builder = request_builder.multipart(form_data);\n")
    ;  } else { 
    ; __append("\nlet post_data = \"")
    ; __append(escapeFn( postData.map(param => {
if (Array.isArray(param.value) || typeof param.value === 'object') {
    return param.name + '=' + encodeURIComponent(JSON.stringify(param.value))
} else {
    return param.name + '=' + encodeURIComponent(param.value)
}
}).join('&') ))
    ; __append("\";\nlet request_builder = request_builder.body(post_data);\n")
    ;  } 
    ; __append("\n")
    ;  } 
    ; __append("\n\nlet response = request_builder.send().await.unwrap();\nlet response_text = response.text().await.unwrap();\nprintln!(\"Response: {}\", response_text);\n")
  return __output;

},
"rust/hyper": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n// Create a new Hyper client object\nlet client = hyper::Client::new();\n\n// Construct the request URL\nlet full_url = \"")
    ; __append(escapeFn( url ))
    ; __append("\";\n\n// Create the request\nlet mut req = hyper::Request::new(hyper::Method::")
    ; __append(escapeFn( method ))
    ; __append(", full_url);\n\n")
    ;  if (headers.length > 0) { 
    ; __append("\n// Add headers to the request\n")
    ;  headers.forEach(header => { 
    ; __append("\nreq.headers_mut().insert(hyper::header::")
    ; __append(escapeFn( header.name ))
    ; __append(", ")
    ; __append(escapeFn( header.value ))
    ; __append(".parse().unwrap());\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  if (cookies.length > 0) { 
    ; __append("\n// Add cookies to the request\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\nreq.headers_mut().insert(hyper::header::COOKIE, format!(\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("={")
    ; __append(escapeFn( cookie.value ))
    ; __append("}; \"));\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  if (postData.length > 0) { 
    ; __append("\n    // Add the request body\n")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\nlet form = multipart::Form::new()\n.file(\"")
    ; __append(escapeFn( postData[0].name ))
    ; __append("\", \"")
    ; __append(escapeFn( postData[0].value ))
    ; __append("\")\n.unwrap();\nlet mut body = hyper::Body::from(form.stream());\n")
    ;  } else { 
    ; __append("\nlet body = hyper::Body::from(\"")
    ; __append(escapeFn( postData.map(param => {
if (Array.isArray(param.value) || typeof param.value === 'object') {
    return param.name + '=' + encodeURIComponent(JSON.stringify(param.value))
} else {
    return param.name + '=' + encodeURIComponent(param.value)
}
}).join('&') ))
    ; __append("\");\n")
    ;  } 
    ; __append("\nreq.headers_mut().insert(hyper::header::CONTENT_TYPE, \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\".parse().unwrap());\nreq.headers_mut().insert(hyper::header::CONTENT_LENGTH, body.len().into());\nreq.set_body(body);\n")
    ;  } 
    ; __append("\n\n// Send the request and get the response\nlet res = client.request(req).await?;\n\n// Print the response\nprintln!(\"Response: \\n{:?}\", res);\n")
  return __output;

},
"ruby/restclient": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nrequire 'rest-client'\n\nurl = \"")
    ; __append(escapeFn( url ))
    ; __append("\"\nmethod = \"")
    ; __append(escapeFn( method ))
    ; __append("\"\nmimeType = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\n\nheaders = {\n  ")
    ;  headers.forEach(header => { 
    ; __append("\n    \"")
    ; __append(escapeFn( header.name ))
    ; __append("\" => \"")
    ; __append(escapeFn( header.value ))
    ; __append("\",\n  ")
    ;  }) 
    ; __append("\n}\n\ncookies = {\n  ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\" => \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\",\n  ")
    ;  }) 
    ; __append("\n}\n\n")
    ;  if (method === 'GET') { 
    ; __append("\n  response = RestClient.get(url, headers: headers, cookies: cookies)\n")
    ;  } else { 
    ; __append("\n  body = \"")
    ; __append(escapeFn( postData.map(param => {
    if (Array.isArray(param.value) || typeof param.value === 'object') {
      return param.name + '=' + encodeURIComponent(JSON.stringify(param.value))
    } else {
      return param.name + '=' + encodeURIComponent(param.value)
    }
  }).join('&') ))
    ; __append("\"\n  response = RestClient::")
    ; __append(escapeFn( method.downcase ))
    ; __append("(url, body, headers: headers, cookies: cookies, content_type: mimeType)\n")
    ;  } 
    ; __append("\n\nputs \"Response: #{response.body}\"\n")
  return __output;

},
"ruby/http": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nrequire 'net/http'\nrequire 'uri'\n\nurl = URI(\"")
    ; __append(escapeFn( url ))
    ; __append("\")\nmethod = \"")
    ; __append(escapeFn( method ))
    ; __append("\"\nmimeType = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\n\n")
    ;  if (method === 'GET') { 
    ; __append("\n  req = Net::HTTP::Get.new(url)\n")
    ;  } else { 
    ; __append("\n  body = \"")
    ; __append(escapeFn( postData.map(param => {
    if (Array.isArray(param.value) || typeof param.value === 'object') {
      return param.name + '=' + encodeURIComponent(JSON.stringify(param.value))
    } else {
      return param.name + '=' + encodeURIComponent(param.value)
    }
  }).join('&') ))
    ; __append("\"\n  req = Net::HTTP::")
    ; __append(escapeFn( method.capitalize ))
    ; __append(".new(url)\n  req.body = body\n  req.content_type = mimeType\n")
    ;  } 
    ; __append("\n\n")
    ;  headers.forEach(header => { 
    ; __append("\n  req['")
    ; __append(escapeFn( header.name ))
    ; __append("'] = '")
    ; __append(escapeFn( header.value ))
    ; __append("'\n")
    ;  }) 
    ; __append("\n\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n  req['Cookie'] = '")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("'\n")
    ;  }) 
    ; __append("\n\nres = Net::HTTP.start(url.hostname, url.port, use_ssl: url.scheme == 'https') do |http|\n  http.request(req)\nend\n\nputs \"Response: #{res.body}\"\n")
  return __output;

},
"python/requests": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport requests\n\n# Extract parameters from the options object\nfullUrl = \"")
    ; __append(escapeFn( url ))
    ; __append("\"\nmethod = \"")
    ; __append(escapeFn( method ))
    ; __append("\"\nmimeType = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\nheaders = {\n    ")
    ;  headers.forEach(header => { 
    ; __append("\n        '")
    ; __append(escapeFn( header.name ))
    ; __append("': '")
    ; __append(escapeFn( header.value ))
    ; __append("',\n    ")
    ;  }) 
    ; __append("\n}\npostData = {\n")
    ;  postData.forEach(param => { 
    ; __append("\n'")
    ; __append(escapeFn( param.name ))
    ; __append("': ")
    ;  if (Array.isArray(param.value) || typeof param.value === 'object') { 
    ; __append("\n    '")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append("',\n")
    ;  } else { 
    ; __append("\n    '")
    ; __append(escapeFn( param.value ))
    ; __append("',\n")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n}\ncookies = {\n    ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n        '")
    ; __append(escapeFn( cookie.name ))
    ; __append("': '")
    ; __append(escapeFn( cookie.value ))
    ; __append("',\n    ")
    ;  }) 
    ; __append("\n}\n\n# Set up the request\nreq = requests.Request(method, fullUrl, headers=headers, cookies=cookies)\n\n# Add data to the request\nif postData:\n    req.data = postData\n\n# Construct the prepared request\nprepared_req = req.prepare()\n\n# Send the request and get the response\nsession = requests.Session()\nresponse = session.send(prepared_req)\n\n# Handle the response\nprint(f\"{response.status_code} {response.reason}\")\nprint(response.text)\n\n# Handle errors\nif response.status_code >= 400:\n    print(\"Error:\", response.status_code, response.reason)\n")
  return __output;

},
"python/http": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport http.client\n\n# Extract parameters from the options object\nfullUrl = \"")
    ; __append(escapeFn( url ))
    ; __append("\"\nmethod = \"")
    ; __append(escapeFn( method ))
    ; __append("\"\nmimeType = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\nheaders = [\n    ")
    ;  headers.forEach(header => { 
    ; __append("\n        ('")
    ; __append(escapeFn( header.name ))
    ; __append("', '")
    ; __append(escapeFn( header.value ))
    ; __append("'),\n    ")
    ;  }) 
    ; __append("\n]\npostData = {\n")
    ;  postData.forEach(param => { 
    ; __append("\n'")
    ; __append(escapeFn( param.name ))
    ; __append("': ")
    ;  if (Array.isArray(param.value) || typeof param.value === 'object') { 
    ; __append("\n    '")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append("',\n")
    ;  } else { 
    ; __append("\n    '")
    ; __append(escapeFn( param.value ))
    ; __append("',\n")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n}\ncookies = {\n    ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n        '")
    ; __append(escapeFn( cookie.name ))
    ; __append("': '")
    ; __append(escapeFn( cookie.value ))
    ; __append("',\n    ")
    ;  }) 
    ; __append("\n}\n\n# Set up the request\nconn = http.client.HTTPSConnection(fullUrl)\n\n# Add headers to the request\nfor header in headers:\n    conn.request(method, url, headers=header)\n\n# Add cookies to the request\ncookie_str = '; '.join([f\"{name}={value}\" for name, value in cookies.items()])\n    conn.request(method, url, headers={'Cookie': cookie_str})\n\n# Send the request\nif postData:\n    postData_str = '&'.join([f\"{name}={value}\" for name, value in postData.items()])\n    conn.request(method, url, body=postData_str, headers={'Content-Type': mimeType})\nelse:\n    conn.request(method, url)\n\n# Handle the response\nres = conn.getresponse()\nprint(res.status, res.reason)\ndata = res.read()\nprint(data.decode(\"utf-8\"))\n\n# Handle errors\nif res.status >= 400:\n    print(\"Error:\", res.status, res.reason)\n")
  return __output;

},
"powershell/webrequest": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ; __append("$url = \"")
    ; __append(escapeFn( url ))
    ; __append("\"\n$method = \"")
    ; __append(escapeFn( method ))
    ; __append("\"\n$mimeType = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\n\n$headers = @{\n")
    ;  headers.forEach(header => { 
    ; __append("\n  \"")
    ; __append(escapeFn( header.name ))
    ; __append("\" = \"")
    ; __append(escapeFn( header.value ))
    ; __append("\",\n")
    ;  }) 
    ; __append("\n}\n\n$cookies = @{\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n  \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\" = \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\",\n")
    ;  }) 
    ; __append("\n}\n\n")
    ;  if (method === 'GET') { 
    ; __append("\n  $req = Invoke-WebRequest -Uri $url -Headers $headers -Cookies $cookies\n")
    ;  } else { 
    ; __append("\n  $body = @{\n  ")
    ;  postData.forEach(param => { 
    ; __append("\n    \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" = ")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n      ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(" | ConvertTo-Json -Depth 100 -Compress\n    ")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n      ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(" | ConvertTo-Json -Depth 100 -Compress\n    ")
    ;  } else { 
    ; __append("\n      '")
    ; __append(escapeFn( param.value ))
    ; __append("'\n    ")
    ;  } 
    ; __append(",\n  ")
    ;  }) 
    ; __append("\n  }\n\n  $req = Invoke-WebRequest -Uri $url -Method $method -Body $body -Headers $headers -ContentType $mimeType -Cookies $cookies\n")
    ;  } 
    ; __append("\n\nWrite-Host \"Response: \" -ForegroundColor Green\nWrite-Host $req.Content\n")
  return __output;

},
"powershell/restmethod": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n$url = \"")
    ; __append(escapeFn( url ))
    ; __append("\"\n$method = \"")
    ; __append(escapeFn( method ))
    ; __append("\"\n$mimeType = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\n\n$headers = @{\n")
    ;  headers.forEach(header => { 
    ; __append("\n  \"")
    ; __append(escapeFn( header.name ))
    ; __append("\" = \"")
    ; __append(escapeFn( header.value ))
    ; __append("\",\n")
    ;  }) 
    ; __append("\n}\n\n$cookies = @{\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n  \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\" = \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\",\n")
    ;  }) 
    ; __append("\n}\n\n")
    ;  if (method === 'GET') { 
    ; __append("\n  $req = Invoke-RestMethod -Uri $url -Headers $headers -Cookies $cookies\n")
    ;  } else { 
    ; __append("\n  $body = @{\n  ")
    ;  postData.forEach(param => { 
    ; __append("\n    \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" = ")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n      ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(" | ConvertTo-Json -Depth 100 -Compress\n    ")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n      ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(" | ConvertTo-Json -Depth 100 -Compress\n    ")
    ;  } else { 
    ; __append("\n      '")
    ; __append(escapeFn( param.value ))
    ; __append("'\n    ")
    ;  } 
    ; __append(",\n  ")
    ;  }) 
    ; __append("\n  }\n\n  $req = Invoke-RestMethod -Uri $url -Method $method -Body $body -Headers $headers -ContentType $mimeType -Cookies $cookies\n")
    ;  } 
    ; __append("\n\nWrite-Host \"Response: \" -ForegroundColor Green\nWrite-Host $req | ConvertTo-Json -Depth 100 -Compress\n")
  return __output;

},
"php/http2": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals;
 
    ; __append("\n\n<?php\n    $host = parse_url(\"")
    ; __append(escapeFn( url ))
    ; __append("\", PHP_URL_HOST);\n    $path = parse_url(\"")
    ; __append(escapeFn( url ))
    ; __append("\", PHP_URL_PATH) ?: \"/\";\n    $httpHeaders = array( ")
    ;  headers.forEach(header => { 
    ; __append(" \"")
    ; __append(escapeFn( header.name ))
    ; __append("\" => \"")
    ; __append(escapeFn( header.value ))
    ; __append("\", ")
    ;  }) 
    ; __append(" );\n    $httpCookies = array( ")
    ;  cookies.forEach(cookie => { 
    ; __append(" \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\" => \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\", ")
    ;  }) 
    ; __append(" );\n    $httpBody = null;\n    if (\"")
    ; __append(escapeFn( method ))
    ; __append("\" === \"POST\") {\n        ")
    ;  if (Array.isArray(postData)) { 
    ; __append("\n        $postData = array( ")
    ;  postData.forEach(param => { 
    ; __append(" '")
    ; __append(escapeFn( param.name ))
    ; __append("' => '")
    ; __append(escapeFn( Array.isArray(param.value) ? JSON.stringify(param.value) : encodeURIComponent(param.value) ))
    ; __append("', ")
    ;  }) 
    ; __append(" );\n        $httpBody = http_build_query($postData);\n        ")
    ;  } else if (typeof postData === 'object') { 
    ; __append("\n        $httpBody = json_encode(")
    ; __append(escapeFn( postData ))
    ; __append(");\n    ")
    ;  } 
    ; __append("\n    }\n    $streamContext = stream_context_create([\n        'http' => [ 'method' => \"")
    ; __append(escapeFn( method ))
    ; __append("\",\n        'header' => implode(\"\\r\\n\", $httpHeaders),\n        'content' => $httpBody, 'follow_location' => false,\n        'protocol_version' => 2.0,\n    ],\n        'ssl' => [ 'verify_peer' => false, 'verify_peer_name' => false, ],\n    ]);\n    $response = file_get_contents(\"https://$host$path\", false, $streamContext);\n    echo \"Response: \" . $response;\n?>\n")
  return __output;

},
"php/http1": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals;
 
    ; __append("\n\n<?php\n    $host = parse_url(\"")
    ; __append(escapeFn( url ))
    ; __append("\", PHP_URL_HOST);\n    $path = parse_url(\"")
    ; __append(escapeFn( url ))
    ; __append("\", PHP_URL_PATH) ?: \"/\";\n    $httpHeaders = array( ")
    ;  headers.forEach(header => { 
    ; __append(" \"")
    ; __append(escapeFn( header.name ))
    ; __append(": ")
    ; __append(escapeFn( header.value ))
    ; __append("\", ")
    ;  }) 
    ; __append(" );\n    $httpCookies = array( ")
    ;  cookies.forEach(cookie => { 
    ; __append(" \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\" => \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\", ")
    ;  }) 
    ; __append(" );\n    $httpBody = null;\n    if (\"")
    ; __append(escapeFn( method ))
    ; __append("\" === \"POST\") {\n    ")
    ;  if (Array.isArray(postData)) { 
    ; __append("\n    ")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n    $httpBody = new http\\Message\\Body(fopen('")
    ; __append(escapeFn( postData[0].value ))
    ; __append("', 'r'));\n    ")
    ;  } else { 
    ; __append("\n     $postData = array( ")
    ;  postData.forEach(param => { 
    ; __append(" '")
    ; __append(escapeFn( param.name ))
    ; __append("' => '")
    ; __append(escapeFn( Array.isArray(param.value) ? JSON.stringify(param.value) : encodeURIComponent(param.value) ))
    ; __append("', ")
    ;  }) 
    ; __append(" );\n     $httpBody = new http\\Message\\Body(http_build_query($postData));\n    ")
    ;  } 
    ; __append(" ")
    ;  } else if (typeof postData === 'object') { 
    ; __append("\n    $postData = '")
    ; __append(escapeFn( JSON.stringify(postData) ))
    ; __append("';\n    $httpBody = new http\\Message\\Body($postData);\n    ")
    ;  } 
    ; __append(" }\n    $request = new http\\Client\\Request(\"")
    ; __append(escapeFn( method ))
    ; __append("\", \"http://$host$path\");\n    $request->setHeaders($httpHeaders);\n    $request->setCookies($httpCookies);\n    $request->setBody($httpBody);\n    $client = new http\\Client;\n    $client->enqueue($request);\n    $response = $client->send();\n    echo \"Response: \" . $response->getBody();\n?>\n")
  return __output;

},
"php/guzzle": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals;
 
    ; __append("\n<?php\n    use GuzzleHttp\\Exception\\RequestException;\n    $client = new Client();\n    $url = \"")
    ; __append(escapeFn( url ))
    ; __append("\";\n    $headers = array( ")
    ;  headers.forEach(header => { 
    ; __append(" \"")
    ; __append(escapeFn( header.name ))
    ; __append("\" => \"")
    ; __append(escapeFn( header.value ))
    ; __append("\", ")
    ;  }) 
    ; __append(" );\n    $cookies = array( ")
    ;  cookies.forEach(cookie => { 
    ; __append(" \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\" => \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\", ")
    ;  }) 
    ; __append(" );\n    $requestBody = null;\n    if (\"")
    ; __append(escapeFn( method ))
    ; __append("\" === \"POST\") {\n    ")
    ;  if (Array.isArray(postData)) { 
    ; __append("\n    ")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n        $requestBody = array( 'multipart' => [ [ 'name' => '")
    ; __append(escapeFn( postData[0].name ))
    ; __append("', 'contents' => fopen('")
    ; __append(escapeFn( postData[0].value ))
    ; __append("', 'r') ] ] );\n    ")
    ;  } else { 
    ; __append("\n        $postData = array( ")
    ;  postData.forEach(param => { 
    ; __append(" '")
    ; __append(escapeFn( param.name ))
    ; __append("' => '")
    ; __append(escapeFn( Array.isArray(param.value) ? JSON.stringify(param.value) : encodeURIComponent(param.value) ))
    ; __append("', ")
    ;  }) 
    ; __append(" );\n        $requestBody = http_build_query($postData);\n    ")
    ;  } 
    ; __append("\n    ")
    ;  } else if (typeof postData === 'object') { 
    ; __append("\n    $postData = '")
    ; __append(escapeFn( JSON.stringify(postData) ))
    ; __append("';\n    $requestBody = $postData;\n    ")
    ;  } 
    ; __append(" }\n    try {\n        $response = $client->request('")
    ; __append(escapeFn( method ))
    ; __append("', $url, [\n            'headers' => $headers,\n            'cookies' => $cookies,\n            'body' => $requestBody,\n        ]);\n        echo \"Response: \" . $response->getBody();\n    } catch (RequestException $e) {\n        echo \"Error: \" . $e->getMessage();\n    }\n\n?>\n")
  return __output;

},
"php/curl": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const {url, method, mimeType, headers, postData, cookies} = locals; 
    ; __append("\n\n<?php\n\n    $url = \"")
    ; __append(escapeFn( url ))
    ; __append("\";\n    $requestHeaders = array( ")
    ;  headers.forEach(header => { 
    ; __append(" \"")
    ; __append(escapeFn( header.name ))
    ; __append(": ")
    ; __append(escapeFn( header.value ))
    ; __append("\", ")
    ;  }) 
    ; __append(" );\n    $requestCookies = array( ")
    ;  cookies.forEach(cookie => { 
    ; __append(" \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=<")
    ; __append(escapeFn( cookie.value ))
    ; __append(">\", ")
    ;  }) 
    ; __append(" );\n    $requestBody = null; if (\"")
    ; __append(escapeFn( method ))
    ; __append("\" === \"POST\") {\n    ")
    ;  if (Array.isArray(postData)) { 
    ; __append("\n    ")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n    $requestBody = array( '")
    ; __append(escapeFn( postData[0].name ))
    ; __append("' => new [](poeCURLFile('")
    ; __append(escapeFn( postData[0].value ))
    ; __append("') );\n    ")
    ;  } else { 
    ; __append("\n    $postData = array( ")
    ;  postData.forEach(param => { 
    ; __append("\n        '")
    ; __append(escapeFn( param.name ))
    ; __append("' => '")
    ; __append(escapeFn( Array.isArray(param.value) ? JSON.stringify(param.value) : encodeURIComponent(param.value) ))
    ; __append("',\n    ")
    ;  }) 
    ; __append(" );\n    $requestBody = http_build_query($postData); ")
    ;  } 
    ; __append("\n    ")
    ;  } else if (typeof postData === 'object') { 
    ; __append("\n    $postData = array( ")
    ;  Object.keys(postData).forEach(key => { 
    ; __append("\n        '")
    ; __append(escapeFn( key ))
    ; __append("' => '")
    ; __append(escapeFn( Array.isArray(postData[key]) ? JSON.stringify(postData[key]) : encodeURIComponent(postData[key]) ))
    ; __append("',\n    ")
    ;  }) 
    ; __append(" );\n    $requestBody = http_build_query($postData); ")
    ;  } 
    ; __append(" } $ch = curl_init(); curl_setopt($ch, CURLOPT_URL, $url);\n    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); curl_setopt($ch, CURLOPT_HTTPHEADER, $requestHeaders);\n    curl_setopt($ch, CURLOPT_COOKIE, implode(\"; \", $requestCookies));\n    if (\"")
    ; __append(escapeFn( method ))
    ; __append("\" === \"POST\") {\n    curl_setopt($ch, CURLOPT_POST, true);\n    curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody); }\n    $response = curl_exec($ch);\n    curl_close($ch);\n    echo \"Response: \" . $response;\n?>\n")
  return __output;

},
"perl/useragent": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n")
    ; __append("\nuse LWP::UserAgent;\nmy $ua = LWP::UserAgent->new;\n\n")
    ; __append("\nmy $fullUrl = '")
    ; __append(escapeFn( url ))
    ; __append("';\n\n")
    ; __append("\nmy $request = HTTP::Request->new('")
    ; __append(escapeFn( method ))
    ; __append("', $fullUrl);\n\n")
    ;  if (headers.length > 0) { 
    ; __append("\n")
    ; __append("\n")
    ;  headers.forEach(header => { 
    ; __append("\n    $request->header('")
    ; __append(escapeFn( header.name ))
    ; __append("', '")
    ; __append(escapeFn( header.value ))
    ; __append("');\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  if (cookies.length > 0) { 
    ; __append("\n")
    ; __append("\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    $ua->cookie_jar->set_cookie(0, '")
    ; __append(escapeFn( cookie.name ))
    ; __append("', '")
    ; __append(escapeFn( cookie.value ))
    ; __append("', '/', 'example.com');\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  if (postData.length > 0) { 
    ; __append("\n")
    ; __append("\n")
    ;  if (Array.isArray(postData)) { 
    ; __append("\n")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\nmy $file = '")
    ; __append(escapeFn( postData[0].value ))
    ; __append("';\n$request->content($file);\n")
    ;  } else { 
    ; __append("\nmy $post_data = {\n")
    ;  postData.forEach(param => { 
    ; __append("\n    '")
    ; __append(escapeFn( param.name ))
    ; __append("' => '")
    ; __append(escapeFn( Array.isArray(param.value) ? JSON.stringify(param.value) : param.value ))
    ; __append("',\n")
    ;  }) 
    ; __append("\n};\n$request->content(join('&', map { $_ . '=' . $post_data->{$} } keys %$post_data));\n")
    ;  } 
    ; __append("\n")
    ;  } else if (typeof postData === 'object') { 
    ; __append("\nmy $post_data = {\n")
    ;  Object.keys(postData).forEach(key => { 
    ; __append("\n'")
    ; __append(escapeFn( key ))
    ; __append("' => '")
    ; __append(escapeFn( Array.isArray(postData[key]) ? JSON.stringify(postData[key]) : postData[key] ))
    ; __append("',\n")
    ;  }) 
    ; __append("\n};\n$request->content(join('&', map { $ . '=' . $post_data->{$_} } keys %$post_data));\n")
    ;  } 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ; __append("\nmy $response = $ua->request($request);\n\n")
    ; __append("\nif ($response->is_success) {\n    print \"Response:\\n\";\n    print $response->content;\n}\n\n")
    ; __append("\nelse {\n    print \"Error: \" . $response->status_line . \"\\n\";\n}\n")
  return __output;

},
"perl/tiny": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n")
    ; __append("\nuse HTTP::Tiny;\nmy $http = HTTP::Tiny->new;\n\n")
    ; __append("\nmy $fullUrl = '")
    ; __append(escapeFn( url ))
    ; __append("';\n\n")
    ; __append("\nmy $options = {\nheaders => {\n    'Content-Type' => '")
    ; __append(escapeFn( mimeType ))
    ; __append("',\n    ")
    ;  headers.forEach(header => { 
    ; __append("\n    '")
    ; __append(escapeFn( header.name ))
    ; __append("' => '")
    ; __append(escapeFn( header.value ))
    ; __append("',\n    ")
    ;  }) 
    ; __append("\n},\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\ncookies => {\n    '")
    ; __append(escapeFn( cookie.name ))
    ; __append("' => '")
    ; __append(escapeFn( cookie.value ))
    ; __append("',\n},\n")
    ;  }) 
    ; __append("\n};\n\n")
    ; __append("\n")
    ;  if (postData.length > 0) { 
    ; __append("\n")
    ;  if (Array.isArray(postData)) { 
    ; __append("\n")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\nmy $file = '")
    ; __append(escapeFn( postData[0].value ))
    ; __append("';\n$options->{content} = $file;\n")
    ;  } else { 
    ; __append("\nmy $post_data = {\n")
    ;  postData.forEach(param => { 
    ; __append("\n    '")
    ; __append(escapeFn( param.name ))
    ; __append("' => '")
    ; __append(escapeFn( Array.isArray(param.value) ? JSON.stringify(param.value) : param.value ))
    ; __append("',\n")
    ;  }) 
    ; __append("\n};\n$options->{content} = join('&', map { $_ . '=' . $post_data->{$} } keys %$post_data);\n")
    ;  } 
    ; __append("\n")
    ;  } else if (typeof postData === 'object') { 
    ; __append("\nmy $post_data = {\n")
    ;  Object.keys(postData).forEach(key => { 
    ; __append("\n    '")
    ; __append(escapeFn( key ))
    ; __append("' => '")
    ; __append(escapeFn( Array.isArray(postData[key]) ? JSON.stringify(postData[key]) : postData[key] ))
    ; __append("',\n")
    ;  }) 
    ; __append("\n};\n$options->{content} = join('&', map { $ . '=' . $post_data->{$_} } keys %$post_data);\n")
    ;  } 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ; __append("\nmy $response = $http->request('")
    ; __append(escapeFn( method ))
    ; __append("', $fullUrl, $options);\n\n")
    ; __append("\nif ($response->{success}) {\n    print \"Response:\\n\";\n    print $response->{content};\n}\n")
    ; __append("\nelse {\n    print \"Error: \" . $response->{status} . \"\\n\";\n}\n")
  return __output;

},
"perl/request": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n")
    ; __append("\nuse HTTP::Request;\nmy $request = HTTP::Request->new('")
    ; __append(escapeFn( method ))
    ; __append("', '")
    ; __append(escapeFn( url ))
    ; __append("');\n\n")
    ;  if (headers.length > 0) { 
    ; __append("\n")
    ; __append("\n")
    ;  headers.forEach(header => { 
    ; __append("\n$request->header('")
    ; __append(escapeFn( header.name ))
    ; __append("', '")
    ; __append(escapeFn( header.value ))
    ; __append("');\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  if (cookies.length > 0) { 
    ; __append("\n")
    ; __append("\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n$request->header('Cookie', '")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("');\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  if (postData.length > 0) { 
    ; __append("\n")
    ; __append("\n")
    ;  if (Array.isArray(postData)) { 
    ; __append("\n")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\nmy $file = '")
    ; __append(escapeFn( postData[0].value ))
    ; __append("';\n$request->content($file);\n")
    ;  } else { 
    ; __append("\nmy $post_data = {\n")
    ;  postData.forEach(param => { 
    ; __append("\n    '")
    ; __append(escapeFn( param.name ))
    ; __append("' => '")
    ; __append(escapeFn( Array.isArray(param.value) ? JSON.stringify(param.value) : param.value ))
    ; __append("',\n")
    ;  }) 
    ; __append("\n};\n$request->content(join('&', map { $_ . '=' . $post_data->{$} } keys %$post_data));\n")
    ;  } 
    ; __append("\n")
    ;  } else if (typeof postData === 'object') { 
    ; __append("\nmy $post_data = {\n")
    ;  Object.keys(postData).forEach(key => { 
    ; __append("\n'")
    ; __append(escapeFn( key ))
    ; __append("' => '")
    ; __append(escapeFn( Array.isArray(postData[key]) ? JSON.stringify(postData[key]) : postData[key] ))
    ; __append("',\n")
    ;  }) 
    ; __append("\n};\n$request->content(join('&', map { $ . '=' . $post_data->{$_} } keys %$post_data));\n")
    ;  } 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ; __append("\nuse HTTP::Tiny;\nmy $http = HTTP::Tiny->new;\nmy $response = $http->request($request);\n\n")
    ; __append("\nif ($response->{success}) {\nprint \"Response:\\n\";\nprint $response->{content};\n}\n\n")
    ; __append("\nelse {\nprint \"Error: \" . $response->{status} . \"\\n\";\n}\n")
  return __output;

},
"ocaml/httpaf": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n(* Construct the request URL *)\nlet fullUrl = \"")
    ; __append(escapeFn( url ))
    ; __append("\" in\nlet headers = Httpaf.Headers.of_list [\n  \"Content-Type\", \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\";\n  ")
    ;  headers.forEach(header => { 
    ; __append("\n    \"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\";\n  ")
    ;  }) 
    ; __append("\n  ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    \"Cookie\", \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\";\n  ")
    ;  }) 
    ; __append("\n] in\nlet body =\n")
    ;  if (postData.length > 0) { 
    ; __append("\n  (match ")
    ; __append(escapeFn( method ))
    ; __append(" with\n  | \"GET\" -> \"\"\n  | _ ->\n  let postData = [%yojson ")
    ; __append(escapeFn( JSON.stringify(postData) ))
    ; __append("] in\n  let rec build_body = function\n  | Assoc [] -> \"\"       | Assoc ((name, value) :: xs) ->\n  (match value with\n  | String s -> name ^ \"=\" ^ Uri.pct_encode s         | Int i -> name ^ \"=\" ^ string_of_int i\n  | Bool b -> name ^ \"=\" ^ string_of_bool b         | List l ->\n  let body_list = List.map (fun x -> (\"\", x)) l in\n  build_body (Assoc body_list)         | Assoc a ->\n  let body_list = List.map (fun (key, value) -> (name ^ \"[\" ^ key ^ \"]\", value)) a in\n  build_body (Assoc body_list))         ^ (if xs = [] then \"\" else \"&\" ^ build_body (Assoc xs))\n  | _ -> failwith \"Invalid post data format\"\n  in build_body postData)\n")
    ;  } else { 
    ; __append("\n  \"\"\n")
    ;  } 
    ; __append("\nin\n  let req = Httpaf.Request.create\n  ~headers\n  (Httpaf.Method.of_string \"")
    ; __append(escapeFn( method ))
    ; __append("\")\n  (Uri.of_string fullUrl)\n  body\nin\n\n(* Send the request *)\nlet conn = Httpaf_lwt_unix.Client.create_connection (Uri.host_with_default ~default:\"localhost\" (Uri.of_string fullUrl)) in\nlet%bind () = Httpaf_lwt_unix.Client.write_request conn req in\nlet%bind resp = Httpaf_lwt_unix.Client.read_response conn in\n\n(* Handle the response *)\nlet%bind body = Httpaf_lwt.Body.to_string resp.body in\nprint_endline (\"Response: \" ^ body);\n\n(* Handle errors *)\nlet error_handler exn =\n  match exn with\n  | Unix.Unix_error (Unix.ENETUNREACH, _, _) ->\n    print_endline \"Error: Network is unreachable\"\n  | Unix.Unix_error (Unix.ECONNREFUSED, _, _) ->\n    print_endline \"Error: Connection refused\"\n  | _ ->\n    Printf.eprintf \"Error: %s\\n\" (Printexc.to_string exn);\n    exit 1\nin\nLwt.catch (fun () -> body) error_handler >>= fun _ -> Lwt.return_unit\n")
  return __output;

},
"ocaml/cohttp_lwt": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n(* Set up the request *)\nlet fullUrl = \"")
    ; __append(escapeFn( url ))
    ; __append("\" in\nlet headers = Cohttp.Header.of_list [\n  \"Content-Type\", \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\";\n    ")
    ;  headers.forEach(header => { 
    ; __append("\n      \"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\";\n    ")
    ;  }) 
    ; __append("\n    ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n      \"Cookie\", \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\";\n    ")
    ;  }) 
    ; __append("\n    ] in\n  let body =\n  ")
    ;  if (postData.length > 0) { 
    ; __append("\n    (match ")
    ; __append(escapeFn( method ))
    ; __append(" with\n    | \"GET\" -> Cohttp_lwt.Body.empty\n    | _ ->\n    let postData = [%yojson ")
    ; __append(escapeFn( JSON.stringify(postData) ))
    ; __append("] in\n    let rec build_body = function\n    | Assoc [] -> Cohttp_lwt.Body.empty       | Assoc ((name, value) :: xs) ->\n    (match value with\n    | String s -> Cohttp_lwt.Body.of_string (name ^ \"=\" ^ Uri.pct_encode s)         | Int i -> Cohttp_lwt.Body.of_string (name ^ \"=\" ^ string_of_int i)\n    | Bool b -> Cohttp_lwt.Body.of_string (name ^ \"=\" ^ string_of_bool b)         | List l ->\n    let body_list = List.map (fun x -> (\"\", x)) l in\n    build_body (Assoc body_list)         | Assoc a ->\n    let body_list = List.map (fun (key, value) -> (name ^ \"[\" ^ key ^ \"]\", value)) a in\n    build_body (Assoc body_list))         >>= fun b1 ->          if xs = [] then Lwt.return b1         else build_body (Assoc xs) >>= fun b2 -> Lwt.return (Cohttp_lwt.Body.concat [b1; Cohttp_lwt.Body.of_string \"&\"; b2])\n    | _ -> failwith \"Invalid post data format\"\n    in build_body postData)\n  ")
    ;  } else { 
    ; __append("\n    Cohttp_lwt.Body.empty\n  ")
    ;  } 
    ; __append("\nin\nlet req = Cohttp_lwt_unix.Client.call (")
    ; __append(escapeFn( method ))
    ; __append(" |> Cohttp.Code.method_of_string) fullUrl ~headers ~body in\nlet run_request () =\nreq >>= fun (resp, body) ->\nlet status = Cohttp.Response.status resp in\nlet code = Cohttp.Code.code_of_status status in\nlet%bind body = Cohttp_lwt.Body.to_string body in\nif code = 200 then Lwt.return (Ok body)   else Lwt.return (Error (\"Error: \" ^ body))\nin\n  let error_handler exn =\n  match exn with\n    | Unix.Unix_error (Unix.ENETUNREACH, _, _) ->\n      print_endline \"Error: Network is unreachable\"\n    | Unix.Unix_error (Unix.ECONNREFUSED, _, _) ->\n      print_endline \"Error: Connection refused\"\n    | _ ->\n    Printf.eprintf \"Error: %s\\n\" (Printexc.to_string exn);\n    exit 1\nin\n  Lwt.catch run_request error_handler >>= function\n    | Ok body -> print_endline (\"Response: \" ^ body); Lwt.return_unit | Error err -> print_endline err; exit 1\n")
  return __output;

},
"objectivec/nsurlsession": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n// Construct the request URL\nNSString *fullUrl = @\"")
    ; __append( url )
    ; __append("\";\nNSMutableDictionary *headers = [NSMutableDictionary dictionary];\n")
    ;  headers.forEach(header => { 
    ; __append("\n    [headers setObject:@\"")
    ; __append(escapeFn( header.value ))
    ; __append("\" forKey:@\"")
    ; __append(escapeFn( header.name ))
    ; __append("\"];\n")
    ;  }) 
    ; __append("\nNSMutableDictionary *parameters = [NSMutableDictionary dictionary];\n")
    ;  postData.forEach(param => { 
    ; __append("\n")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n    NSMutableArray *")
    ; __append(escapeFn( param.name ))
    ; __append("Array = [NSMutableArray array];\n    ")
    ;  param.value.forEach(arrayItem => { 
    ; __append("\n    ")
    ;  if (typeof arrayItem === 'object') { 
    ; __append("\n    NSDictionary *")
    ; __append(escapeFn( param.name ))
    ; __append("Item = @{\n    ")
    ;  Object.keys(arrayItem).forEach(key => { 
    ; __append("\n        @\"")
    ; __append(escapeFn( key ))
    ; __append("\": ")
    ; __append(escapeFn( JSON.stringify(arrayItem[key]) ))
    ; __append(",\n    ")
    ;  }) 
    ; __append("\n    };\n    [")
    ; __append(escapeFn( param.name ))
    ; __append("Array addObject:")
    ; __append(escapeFn( param.name ))
    ; __append("Item];\n    ")
    ;  } else { 
    ; __append("\n        [")
    ; __append(escapeFn( param.name ))
    ; __append("Array addObject:@\"")
    ; __append(escapeFn( arrayItem ))
    ; __append("\"];\n    ")
    ;  } 
    ; __append("\n    ")
    ;  }) 
    ; __append("\n    [parameters setObject:")
    ; __append(escapeFn( param.name ))
    ; __append("Array forKey:@\"")
    ; __append(escapeFn( param.name ))
    ; __append("\"];\n")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n    NSDictionary *")
    ; __append(escapeFn( param.name ))
    ; __append("Dict = @{\n    ")
    ;  Object.keys(param.value).forEach(key => { 
    ; __append("\n        @\"")
    ; __append(escapeFn( key ))
    ; __append("\": ")
    ; __append(escapeFn( JSON.stringify(param.value[key]) ))
    ; __append(",\n    ")
    ;  }) 
    ; __append("\n    };\n    [parameters setObject:")
    ; __append(escapeFn( param.name ))
    ; __append("Dict forKey:@\"")
    ; __append(escapeFn( param.name ))
    ; __append("\"];\n")
    ;  } else { 
    ; __append("\n    [parameters setObject:@\"")
    ; __append(escapeFn( param.value ))
    ; __append("\" forKey:@\"")
    ; __append(escapeFn( param.name ))
    ; __append("\"];\n")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\nNSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:fullUrl]];\nrequest.HTTPMethod = @\"")
    ; __append(escapeFn( method ))
    ; __append("\";\n[request setValue:@\"")
    ; __append(escapeFn( mimeType ))
    ; __append("\" forHTTPHeaderField:@\"Content-Type\"];\nfor (NSString *key in headers) {\n    [request setValue:headers[key] forHTTPHeaderField:key];\n}\nNSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];\nNSURLSession *session = [NSURLSession sessionWithConfiguration:config];\n\nif (parameters.count > 0) {\n    NSError *jsonError;\n    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:parameters options:0 error:&jsonError];\n    if (jsonError) {\n        NSLog(@\"Error converting parameters to JSON: %@\", jsonError);\n        return;\n    }\n    request.HTTPBody = jsonData;\n}\n\nNSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\nNSDictionary *cookieProperties = @{\n    NSHTTPCookieDomain: @\"")
    ; __append(escapeFn( cookie.domain ))
    ; __append("\",\n    NSHTTPCookiePath: @\"")
    ; __append(escapeFn( cookie.path ))
    ; __append("\",\n    NSHTTPCookieName: @\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\",\n    NSHTTPCookieValue: @\"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\",\n};\nNSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:cookieProperties];\n[cookieStorage setCookie:cookie];\n")
    ;  }) 
    ; __append("\n\nNSURLSessionDataTask *task = [session dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {\nif (error) {\n    NSLog(@\"Error: %@\", error);\n        return;\n    }\n    if ([response isKindOfClass:[NSHTTPURLResponse class]]) {\n        NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *)response;\n        if (httpResponse.statusCode == 200) {\n            NSString *responseString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];\n            NSLog(@\"Response: %@\", responseString);\n        }\n    }\n}];\n[task resume];\n")
  return __output;

},
"objectivec/afnetworking": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n// Construct the request URL\nNSString *fullUrl = @\"")
    ; __append( url )
    ; __append("\";\n\n// Set up the request headers\nNSMutableDictionary *headers = [NSMutableDictionary dictionary];\n")
    ;  headers.forEach(header => { 
    ; __append("\n    [headers setObject:@\"")
    ; __append(escapeFn( header.value ))
    ; __append("\" forKey:@\"")
    ; __append(escapeFn( header.name ))
    ; __append("\"];\n")
    ;  }) 
    ; __append("\n\n// Add cookies to the request\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\nNSDictionary *cookieProperties = @{\n    NSHTTPCookieDomain: @\"")
    ; __append(escapeFn( cookie.domain ))
    ; __append("\",\n    NSHTTPCookiePath: @\"")
    ; __append(escapeFn( cookie.path ))
    ; __append("\",\n    NSHTTPCookieName: @\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\",\n    NSHTTPCookieValue: @\"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\",\n};\nNSHTTPCookie *cookie = [NSHTTPCookie cookieWithProperties:cookieProperties];\n[[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];\n")
    ;  }) 
    ; __append("\n\n// Set up the request parameters\nNSMutableDictionary *parameters = [NSMutableDictionary dictionary];\n")
    ;  postData.forEach(param => { 
    ; __append("\n    ")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n    NSMutableArray *")
    ; __append(escapeFn( param.name ))
    ; __append("Array = [NSMutableArray array];\n    ")
    ;  param.value.forEach(val => { 
    ; __append("\n    ")
    ;  if (typeof val === 'object') { 
    ; __append("\n    NSDictionary *")
    ; __append(escapeFn( param.name ))
    ; __append("Object = @{\n        '")
    ; __append(escapeFn( Object.keys(val)[0] ))
    ; __append("': ")
    ; __append(escapeFn( JSON.stringify(val[Object.keys(val)[0]]) ))
    ; __append(",\n    };\n    [")
    ; __append(escapeFn( param.name ))
    ; __append("Array addObject:")
    ; __append(escapeFn( param.name ))
    ; __append("Object];\n    ")
    ;  } else { 
    ; __append("\n        [")
    ; __append(escapeFn( param.name ))
    ; __append("Array addObject:@\"")
    ; __append(escapeFn( encodeURIComponent(val) ))
    ; __append("\"];\n    ")
    ;  } 
    ; __append("\n    ")
    ;  }) 
    ; __append("\n    [parameters setObject:")
    ; __append(escapeFn( param.name ))
    ; __append("Array forKey:@\"")
    ; __append(escapeFn( param.name ))
    ; __append("\"];\n    ")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n        NSDictionary *")
    ; __append(escapeFn( param.name ))
    ; __append("Object = @{\n        '")
    ; __append(escapeFn( Object.keys(param.value)[0] ))
    ; __append("': ")
    ; __append(escapeFn( JSON.stringify(param.value[Object.keys(param.value)[0]]) ))
    ; __append(",\n        };\n        [parameters setObject:")
    ; __append(escapeFn( param.name ))
    ; __append("Object forKey:@\"")
    ; __append(escapeFn( param.name ))
    ; __append("\"];\n    ")
    ;  } else { 
    ; __append("\n        [parameters setObject:@\"")
    ; __append(escapeFn( encodeURIComponent(param.value) ))
    ; __append("\" forKey:@\"")
    ; __append(escapeFn( param.name ))
    ; __append("\"];\n    ")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n\n// Create the request manager\nAFHTTPSessionManager *manager = [AFHTTPSessionManager manager];\nmanager.requestSerializer = [AFJSONRequestSerializer serializer];\nmanager.responseSerializer = [AFJSONResponseSerializer serializer];\n\n// Add the headers to the request manager\nfor (NSString *key in headers) {\n    [manager.requestSerializer setValue:headers[key] forHTTPHeaderField:key];\n}\n\n// Add the cookies to the request manager\nNSArray *cookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookiesForURL:[NSURL URLWithString:fullUrl]];\nNSDictionary *cookieHeaders = [NSHTTPCookie requestHeaderFieldsWithCookies:cookies];\nfor (NSString *key in cookieHeaders) {\n    [manager.requestSerializer setValue:cookieHeaders[key] forHTTPHeaderField:key];\n}\n\n// Send the request\nNSString *method = @\"")
    ; __append(escapeFn( method ))
    ; __append("\";\nif ([method isEqualToString:@\"GET\"]) {\n    [manager GET:fullUrl parameters:parameters headers:nil progress:nil success:^(NSURLSessionDataTask * _Nonnull task, id _Nullable responseObject) {\n        NSLog(@\"Response: %@\", responseObject);\n    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {\n        NSLog(@\"Error: %@\", error);\n    }];\n} else if ([method isEqualToString:@\"POST\"]) {\n    [manager POST:fullUrl parameters:parameters headers:nil progress:nil success:^(NSURLSessionDataTask * _Nonnull task, id _Nullable responseObject) {\n        NSLog(@\"Response: %@\", responseObject);\n    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {\n        NSLog(@\"Error: %@\", error);\n    }];\n} else if ([method isEqualToString:@\"PUT\"]) {\n    [manager PUT:fullUrl parameters:parameters headers:nil success:^(NSURLSessionDataTask * _Nonnull task, id _Nullable responseObject) {\n        NSLog(@\"Response: %@\", responseObject);\n    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {\n        NSLog(@\"Error: %@\", error);\n    }];\n} else if ([method isEqualToString:@\"DELETE\"]) {\n    [manager DELETE:fullUrl parameters:parameters headers:nil success:^(NSURLSessionDataTask * _Nonnull task, id _Nullable responseObject) {\n        NSLog(@\"Response: %@\", responseObject);\n    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {\n        NSLog(@\"Error: %@\", error);\n    }];\n} else {\n    // Handle unsupported methods\n}\n")
  return __output;

},
"lua/httpclient": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nlocal http_client = require(\"httpclient\")\n\n-- Extract parameters from the options object\nlocal url = '")
    ; __append(escapeFn( url ))
    ; __append("'\nlocal method = '")
    ; __append(escapeFn( method ))
    ; __append("'\nlocal mimeType = '")
    ; __append(escapeFn( mimeType ))
    ; __append("'\nlocal headers = {\n")
    ;  headers.forEach(header => { 
    ; __append("\n    ['")
    ; __append(escapeFn( header.name ))
    ; __append("'] = '")
    ; __append(escapeFn( header.value ))
    ; __append("',\n")
    ;  }) 
    ; __append("\n}\nlocal postData = {\n")
    ;  postData.forEach(param => { 
    ; __append("\n    ['")
    ; __append(escapeFn( param.name ))
    ; __append("'] = ")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n        {\n        ")
    ;  param.value.forEach((val, index) => { 
    ; __append("\n            ")
    ;  if (typeof val === 'object') { 
    ; __append("\n                ['")
    ; __append(escapeFn( Object.keys(val)[0] ))
    ; __append("'] = ")
    ; __append(escapeFn( JSON.stringify(val[Object.keys(val)[0]]) ))
    ; __append(",\n            ")
    ;  } else { 
    ; __append("\n                ")
    ; __append(escapeFn( index ))
    ; __append(" = '")
    ; __append(escapeFn( encodeURIComponent(val) ))
    ; __append("',\n            ")
    ;  } 
    ; __append("\n        ")
    ;  }) 
    ; __append("\n        },\n    ")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n        {\n        ['")
    ; __append(escapeFn( Object.keys(param.value)[0] ))
    ; __append("'] = ")
    ; __append(escapeFn( JSON.stringify(param.value[Object.keys(param.value)[0]]) ))
    ; __append(",\n        },\n    ")
    ;  } else { 
    ; __append("\n        '")
    ; __append(escapeFn( encodeURIComponent(param.value) ))
    ; __append("',\n    ")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n}\nlocal cookies = {\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    ['")
    ; __append(escapeFn( cookie.name ))
    ; __append("'] = '")
    ; __append(escapeFn( cookie.value ))
    ; __append("',\n")
    ;  }) 
    ; __append("\n}\n\n-- Construct the request table\nlocal request = {\n    url = url,\n    method = method,\n    headers = headers,\n}\nif method == \"POST\" then\n    request.data = postData\nend\n\n-- Add cookies to the request headers\nlocal cookieHeader = \"\"\nfor cookie, value in pairs(cookies) do\n    cookieHeader = cookieHeader .. cookie .. \"=\" .. value .. \"; \"\nend\nif cookieHeader ~= \"\" then\n    request.headers['Cookie'] = string.sub(cookieHeader, 1, -3)\nend\n\n-- Send the request\nlocal response = http_client.send(request)\n\n-- Print the response\nprint(response.body)\n")
  return __output;

},
"lua/http": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nlocal http = require(\"socket.http\")\nlocal ltn12 = require(\"ltn12\")\n\n-- Extract parameters from the options object\nlocal url = '")
    ; __append(escapeFn( url ))
    ; __append("'\nlocal method = '")
    ; __append(escapeFn( method ))
    ; __append("'\nlocal mimeType = '")
    ; __append(escapeFn( mimeType ))
    ; __append("'\nlocal headers = {\n")
    ;  headers.forEach(header => { 
    ; __append("\n    ['")
    ; __append(escapeFn( header.name ))
    ; __append("'] = '")
    ; __append(escapeFn( header.value ))
    ; __append("',\n")
    ;  }) 
    ; __append("\n}\nlocal postData = {\n")
    ;  postData.forEach(param => { 
    ; __append("\n    ['")
    ; __append(escapeFn( param.name ))
    ; __append("'] = ")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n    {\n    ")
    ;  param.value.forEach((val, index) => { 
    ; __append("\n    ")
    ;  if (typeof val === 'object') { 
    ; __append("\n        ['")
    ; __append(escapeFn( Object.keys(val)[0] ))
    ; __append("'] = ")
    ; __append(escapeFn( JSON.stringify(val[Object.keys(val)[0]]) ))
    ; __append(",\n    ")
    ;  } else { 
    ; __append("\n        ")
    ; __append(escapeFn( index ))
    ; __append(" = '")
    ; __append(escapeFn( encodeURIComponent(val) ))
    ; __append("',\n    ")
    ;  } 
    ; __append("\n    ")
    ;  }) 
    ; __append("\n    },\n    ")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n    {\n    ['")
    ; __append(escapeFn( Object.keys(param.value)[0] ))
    ; __append("'] = ")
    ; __append(escapeFn( JSON.stringify(param.value[Object.keys(param.value)[0]]) ))
    ; __append(",\n    },\n    ")
    ;  } else { 
    ; __append("\n    '")
    ; __append(escapeFn( encodeURIComponent(param.value) ))
    ; __append("',\n    ")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n}\nlocal cookies = {\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    ['")
    ; __append(escapeFn( cookie.name ))
    ; __append("'] = '")
    ; __append(escapeFn( cookie.value ))
    ; __append("',\n")
    ;  }) 
    ; __append("\n}\n\n-- Construct the request table\nlocal request = {\nurl = url,\nmethod = method,\nheaders = headers,\nsource = nil,\nsink = ltn12.sink.table(),\n}\nif method == \"POST\" then\n    request.source = postData\nend\n\n-- Add cookies to the request headers\nlocal cookieHeader = \"\"\nfor cookie, value in pairs(cookies) do\ncookieHeader = cookieHeader .. cookie .. \"=\" .. value .. \"; \"\nend\nif cookieHeader ~= \"\" then\nrequest.headers['Cookie'] = string.sub(cookieHeader, 1, -3)\nend\n\n-- Send the request\nlocal response = \"\"\nlocal result, code, response_headers, status = http.request(request)\nif result then\nresponse = table.concat(request.sink)\nend\n\n-- Print the response\nprint(response)\n")
  return __output;

},
"lua/curl": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nlocal curl = require(\"cURL\")\n\n-- Extract parameters from the options object\nlocal url = '")
    ; __append(escapeFn( url ))
    ; __append("'\nlocal method = '")
    ; __append(escapeFn( method ))
    ; __append("'\nlocal mimeType = '")
    ; __append(escapeFn( mimeType ))
    ; __append("'\nlocal headers = {\n")
    ;  headers.forEach(header => { 
    ; __append("\n    ['")
    ; __append(escapeFn( header.name ))
    ; __append("'] = '")
    ; __append(escapeFn( header.value ))
    ; __append("',\n")
    ;  }) 
    ; __append("\n}\nlocal postData = {\n")
    ;  postData.forEach(param => { 
    ; __append("\n    ")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n    ['")
    ; __append(escapeFn( param.name ))
    ; __append("'] = ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(",\n    ")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n    ['")
    ; __append(escapeFn( param.name ))
    ; __append("'] = ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(",\n    ")
    ;  } else { 
    ; __append("\n    ['")
    ; __append(escapeFn( param.name ))
    ; __append("'] = '")
    ; __append(escapeFn( param.value ))
    ; __append("',\n    ")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n}\nlocal cookies = {\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    ['")
    ; __append(escapeFn( cookie.name ))
    ; __append("'] = '")
    ; __append(escapeFn( cookie.value ))
    ; __append("',\n")
    ;  }) 
    ; __append("\n}\n\n-- Construct the request command\nlocal command = \"curl -X \" .. method .. \" '\" .. url .. \"'\"\nif mimeType ~= '' then\n    command = command .. \" -H 'Content-Type: \" .. mimeType .. \"'\"\nend\nfor header, value in pairs(headers) do\n    command = command .. \" -H '\" .. header .. \": \" .. value .. \"'\"\nend\nfor cookie, value in pairs(cookies) do\n    command = command .. \" --cookie '\" .. cookie .. \"=\" .. value .. \"'\"\nend\nif method == \"POST\" then\n    command = command .. \" --data '\"\n    for key, value in pairs(postData) do\n        command = command .. key .. \"[]=\" .. item .. \"&\"\n    end\n    command = string.sub(command, 1, -2) .. \"'\"\nend\n\n-- Execute the request command\nlocal easy = curl.easy()\neasy:setopt(curl.OPT_URL, url)\neasy:setopt(curl.OPT_CUSTOMREQUEST, method)\neasy:setopt(curl.OPT_HEADER, true)\neasy:setopt(curl.OPT_VERBOSE, true)\neasy:setopt(curl.OPT_POSTFIELDS, postData)\neasy:setopt(curl.OPT_COOKIE, cookies)\nlocal response_body = {}\neasy:setopt(curl.OPT_WRITEFUNCTION, function (data)\n    table.insert(response_body, data)\n    return #data\nend)\neasy:perform()\neasy:close()\n\n-- Print the response\nlocal response = table.concat(response_body)\nprint(response)\n")
  return __output;

},
"kotlin/okhttp3": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport okhttp3.*\nimport java.io.IOException\n\nval client = OkHttpClient()\n\nval url = \"")
    ; __append(escapeFn( url ))
    ; __append("\"\nval method = \"")
    ; __append(escapeFn( method ))
    ; __append("\"\nval mimeType = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\n\nval body = ")
    ;  if (postData.length > 0) { 
    ; __append("\n  ")
    ;  postData.forEach(param => { 
    ; __append("\n  ")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n  \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" to ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(",\n  ")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n  \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" to ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(",\n  ")
    ;  } else { 
    ; __append("\n  \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" to \"")
    ; __append(escapeFn( param.value ))
    ; __append("\",\n  ")
    ;  } 
    ; __append("\n  ")
    ;  }) 
    ; __append("\n  .joinToString(separator = \"&\") { \"${it.first}=${URLEncoder.encode(it.second.toString(), \"UTF-8\")}\" }\n  .let { RequestBody.create(MediaType.parse(mimeType), it) }\n")
    ;  } else { 
    ; __append("\n  null\n")
    ;  } 
    ; __append("\n\nval request = Request.Builder()\n.url(url)\n.")
    ; __append(escapeFn( method.toLowerCase() ))
    ; __append("(body)\n")
    ;  headers.forEach(header => { 
    ; __append("\n  .addHeader(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\")\n")
    ;  }) 
    ; __append("\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n  .addHeader(\"Cookie\", \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\")\n")
    ;  }) 
    ; __append("\n.build()\n\nval response = client.newCall(request).execute()\n\nprintln(\"Response: \" + response.body()?.string())\n")
  return __output;

},
"kotlin/java": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport java.net.HttpURLConnection\nimport java.net.URL\nimport java.net.URLEncoder\n\nval url = URL(\"")
    ; __append(escapeFn( url ))
    ; __append("\")\nval connection = url.openConnection() as HttpURLConnection\nconnection.requestMethod = \"")
    ; __append(escapeFn( method ))
    ; __append("\"\n\n")
    ;  if (headers.length > 0) { 
    ; __append("\n// Add headers to the request\n")
    ;  headers.forEach(header => { 
    ; __append("\nconnection.setRequestProperty(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\")\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  if (cookies.length > 0) { 
    ; __append("\n// Add cookies to the request\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\nconnection.addRequestProperty(\"Cookie\", \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\")\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n// Send the request\n")
    ; 
if (postData.length > 0) {
  if (method === 'POST') {

    ; __append("\nval postData = \"")
    ; __append(escapeFn( postData.map(param => {
  if (Array.isArray(param.value)) {
    const encodedValues = param.value.map(value => encodeURIComponent(value.toString(), 'UTF-8'))
    return encodedValues.map(value => param.name + '=' + value).join('&')
  } else if (typeof param.value === 'object') {
    const encodedValues = Object.values(param.value).map(value => encodeURIComponent(value.toString(), 'UTF-8'))
    const keys = Object.keys(param.value)
    return encodedValues.map((value, index) => param.name + '[' + keys[index] + ']=' + value).join('&')
  } else {
    return param.name + '=' + encodeURIComponent(param.value.toString(), 'UTF-8')
  }
}).join('&') ))
    ; __append("\".toByteArray(Charsets.UTF_8)\nconnection.setRequestProperty(\"Content-Type\", \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\")\nconnection.setRequestProperty(\"Content-Length\", postData.size.toString())\nconnection.doOutput = true\nconnection.outputStream.write(postData)\n")
    ; 
  } else {

    ; __append("\nprintln(\"Error: GET method does not support POST data.\")\n")
    ; 
  }
} else {

    ; __append("\nconnection.connect()\n")
    ; 
}

    ; __append("\n\n// Handle the response\nif (connection.responseCode == HttpURLConnection.HTTP_OK) {\n  val response = connection.inputStream.bufferedReader().use { it.readText() }\n  println(\"Response: $response\")\n} else {\n  println(\"Error: ${connection.responseMessage}\")\n}\nconnection.disconnect()\n")
  return __output;

},
"kotlin/fuel": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport com.github.kittinunf.fuel.*\nimport com.github.kittinunf.fuel.core.*\nimport com.github.kittinunf.result.*\n\nval fullUrl = \"")
    ; __append(escapeFn( url ))
    ; __append("\"\n\nval requestHeaders = listOf(\n    ")
    ;  headers.forEach(header => { 
    ; __append("\n    \"")
    ; __append(escapeFn( header.name ))
    ; __append("\" to \"")
    ; __append(escapeFn( header.value ))
    ; __append("\",\n    ")
    ;  }) 
    ; __append("\n)\n\nval requestCookies = listOf(\n    ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\" to \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\",\n    ")
    ;  }) 
    ; __append("\n)\n\nval parameters = listOf(\n    ")
    ;  postData.forEach(param => { 
    ; __append("\n    ")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n    \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" to ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(",\n    ")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n    \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" to ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(",\n    ")
    ;  } else { 
    ; __append("\n    \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" to \"")
    ; __append(escapeFn( param.value ))
    ; __append("\",\n    ")
    ;  } 
    ; __append("\n    ")
    ;  }) 
    ; __append("\n)\n\nval request = Fuel.request(Method.")
    ; __append(escapeFn( method ))
    ; __append(", fullUrl)\n    .header(requestHeaders)\n    .header(\"Content-Type\", \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\")\n    .header(\"Cookie\", requestCookies.joinToString(separator = \"; \") { \"${it.first}=${it.second}\" })\n\nif (parameters.isNotEmpty()) {\n    request.parameters(parameters)\n}\n\nrequest.responseString { _, _, result ->\n    when (result) {\n        is Result.Failure -> {\n            println(\"Error: ${result.getException().message}\")\n        }\n        is Result.Success -> {\n            val data = result.get()\n            println(\"Response: $data\")\n        }\n    }\n}\n")
  return __output;

},
"javascript/jquery": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nasync function makeRequest(url, method, mimeType, headers, cookies, postData) {\n  const fullUrl = url;\n\n  // Set up the request configuration object\n  const config = {\n    url: fullUrl,\n    type: method,\n    headers: {\n      'Content-Type': mimeType,\n      ")
    ;  headers.forEach(header => { 
    ; __append("'")
    ; __append(escapeFn( header.name ))
    ; __append("': '")
    ; __append(escapeFn( header.value ))
    ; __append("',")
    ;  }) 
    ; __append("\n    },\n    data: ")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n      new FormData(document.getElementById('#file_upload_form'))\n      ")
    ;  } else if (postData.length > 0) { 
    ; __append("postData\n      ")
    ;  } else { 
    ; __append(" null ")
    ;  } 
    ; __append("\n  };\n\n  // Add cookies to the request\n  ")
    ;  cookies.forEach(cookie => { 
    ; __append("document.cookie = '")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("';\n  ")
    ;  }) 
    ; __append("\n\n  // Send the request using jQuery\n  try {\n    const data = await $.ajax(config);\n    console.log('Response:', data);\n    return data;\n  } catch (error) {\n    console.error('Error:', error.message);\n    throw error;\n  }\n}\n\n// Example usage\nconst url = '")
    ; __append(escapeFn( url ))
    ; __append("';\nconst method = '")
    ; __append(escapeFn( method ))
    ; __append("';\nconst mimeType = '")
    ; __append(escapeFn( mimeType ))
    ; __append("';\nconst headers = {\n  ")
    ;  headers.forEach(header => { 
    ; __append("'")
    ; __append(escapeFn( header.name ))
    ; __append("': '")
    ; __append(escapeFn( header.value ))
    ; __append("',")
    ;  }) 
    ; __append("\n};\nconst cookies = {\n  ")
    ;  cookies.forEach(cookie => { 
    ; __append("'")
    ; __append(escapeFn( cookie.name ))
    ; __append("': '")
    ; __append(escapeFn( cookie.value ))
    ; __append("',")
    ;  }) 
    ; __append("\n};\nconst postData = ")
    ; __append( JSON.stringify(postData, null, 2) )
    ; __append("\n\nmakeRequest(url, method, mimeType, headers, cookies, postData);\n")
  return __output;

},
"javascript/fetch": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nasync function makeRequest(url, method, mimeType, headers, cookies, postData) {\n  // Construct the request configuration object\n  var config = {\n    method: method,\n    headers: {\n      'Content-Type': mimeType,\n      ")
    ;  headers.forEach(header => { 
    ; __append("'")
    ; __append(escapeFn( header.name ))
    ; __append("': '")
    ; __append(escapeFn( header.value ))
    ; __append("',")
    ;  }) 
    ; __append("\n    },\n    body: ")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n      new FormData(document.getElementById('#file_upload_form'))\n      ")
    ;  } else if (postData.length > 0) { 
    ; __append("postData\n      ")
    ;  } else { 
    ; __append(" null ")
    ;  } 
    ; __append("\n  };\n\n  // Add cookies to the request\n  ")
    ;  cookies.forEach(cookie => { 
    ; __append("document.cookie = '")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("';\n  ")
    ;  }) 
    ; __append("\n\n  // Send the request using fetch\n  try {\n    const response = await fetch(url, config);\n    if (!response.ok) {\n      throw new Error('HTTP error, status = ' + response.status);\n    }\n    const data = await response.text();\n    console.log('Response:', data);\n    return data;\n  } catch (error) {\n    console.error('Error:', error.message);\n    throw error;\n  }\n}\n\n// Example usage\nconst url = '")
    ; __append(escapeFn( url ))
    ; __append("';\nconst method = '")
    ; __append(escapeFn( method ))
    ; __append("';\nconst mimeType = '")
    ; __append(escapeFn( mimeType ))
    ; __append("';\nconst headers = {\n  ")
    ;  headers.forEach(header => { 
    ; __append("'")
    ; __append(escapeFn( header.name ))
    ; __append("': '")
    ; __append(escapeFn( header.value ))
    ; __append("',")
    ;  }) 
    ; __append("\n};\nconst cookies = {\n  ")
    ;  cookies.forEach(cookie => { 
    ; __append("'")
    ; __append(escapeFn( cookie.name ))
    ; __append("': '")
    ; __append(escapeFn( cookie.value ))
    ; __append("',")
    ;  }) 
    ; __append("\n};\nconst postData = ")
    ; __append( JSON.stringify(postData, null, 2) )
    ; __append("\n\nmakeRequest(url, method, mimeType, headers, cookies, postData);\n")
  return __output;

},
"javascript/axios": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n// Import the Axios library\nimport axios from 'axios';\n\nasync function makeRequest(url, method, mimeType, headers, cookies, postData) {\n  // Construct the request configuration object\n  var config = {\n    method: method,\n    url: url,\n    headers: {\n      'Content-Type': mimeType,\n      ")
    ;  headers.forEach(header => { 
    ; __append("'")
    ; __append(escapeFn( header.name ))
    ; __append("': '")
    ; __append(escapeFn( header.value ))
    ; __append("',")
    ;  }) 
    ; __append("\n    },\n    data: ")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n      new FormData(document.getElementById('#file_upload_form'))\n      ")
    ;  } else if (postData.length > 0) { 
    ; __append("postData\n      ")
    ;  } else { 
    ; __append(" undefined ")
    ;  } 
    ; __append("\n  };\n\n  // Add cookies to the request\n  ")
    ;  cookies.forEach(cookie => { 
    ; __append("document.cookie = '")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("';\n  ")
    ;  }) 
    ; __append("\n\n  // Send the request using Axios\n  try {\n    const response = await axios(config);\n    console.log('Response:', response.data);\n    return response.data;\n  } catch (error) {\n    console.error('Error:', error);\n    throw error;\n  }\n}\n\n// Example usage\nconst url = '")
    ; __append(escapeFn( url ))
    ; __append("';\nconst method = '")
    ; __append(escapeFn( method ))
    ; __append("';\nconst mimeType = '")
    ; __append(escapeFn( mimeType ))
    ; __append("';\nconst headers = {\n  ")
    ;  headers.forEach(header => { 
    ; __append("'")
    ; __append(escapeFn( header.name ))
    ; __append("': '")
    ; __append(escapeFn( header.value ))
    ; __append("',")
    ;  }) 
    ; __append("\n};\nconst cookies = {\n  ")
    ;  cookies.forEach(cookie => { 
    ; __append("'")
    ; __append(escapeFn( cookie.name ))
    ; __append("': '")
    ; __append(escapeFn( cookie.value ))
    ; __append("',")
    ;  }) 
    ; __append("\n};\nconst postData = ")
    ; __append( JSON.stringify(postData, null, 2) )
    ; __append("\n\nmakeRequest(url, method, mimeType, headers, cookies, postData);\n")
  return __output;

},
"javascript/xmlhttprequest": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nasync function makeRequest(url, method, mimeType, headers, cookies, postData) {\n  const xhr = new XMLHttpRequest();\n\n  // Construct the request URL\n  const fullUrl = url;\n\n  // Set up the request\n  xhr.open(method, fullUrl, true);\n  xhr.setRequestHeader('Content-Type', mimeType);\n\n  // Add headers to the request\n  headers.forEach(header => {\n    xhr.setRequestHeader(header.name, header.value);\n  });\n\n  // Add cookies to the request\n  cookies.forEach(cookie => {\n    document.cookie = `${cookie.name}=${cookie.value}`;\n  });\n\n  // Send the request\nif (Array.isArray(postData)) {\n  if (postData.length > 0) {\n    if (postData.some(param => param.type === 'file')) {\n      xhr.send(new FormData(document.getElementById('#file_upload_form')));\n    } else {\n      const encodedParams = postData.map(param => ${param.name}=${encodeURIComponent(param.value)}).join('&');\n      xhr.send(encodedParams);\n    }\n  } else {\n    xhr.send();\n  }\n} else if (typeof postData === 'object' && postData !== null) {\n    xhr.send(JSON.stringify(postData));\n} else {\n  xhr.send();\n}\n\n  // Handle the response\n  try {\n    await new Promise((resolve, reject) => {\n      xhr.onreadystatechange = function() {\n        if (this.readyState === 4) {\n          if (this.status === 200) {\n            console.log('Response:', this.responseText);\n            resolve(this.responseText);\n          } else {\n            reject(new Error(`Request failed with status code ${this.status}`));\n          }\n        }\n      };\n    });\n  } catch (error) {\n    console.error('Error:', error.message);\n    throw error;\n  }\n}\n\n// Example usage\nconst url = '")
    ; __append(escapeFn( url ))
    ; __append("';\nconst method = '")
    ; __append(escapeFn( method ))
    ; __append("';\nconst mimeType = '")
    ; __append(escapeFn( mimeType ))
    ; __append("';\nconst headers = [\n  ")
    ;  headers.forEach(header => { 
    ; __append("{ name: '")
    ; __append(escapeFn( header.name ))
    ; __append("', value: '")
    ; __append(escapeFn( header.value ))
    ; __append("' },")
    ;  }) 
    ; __append("\n];\nconst cookies = [\n  ")
    ;  cookies.forEach(cookie => { 
    ; __append("{ name: '")
    ; __append(escapeFn( cookie.name ))
    ; __append("', value: '")
    ; __append(escapeFn( cookie.value ))
    ; __append("' },")
    ;  }) 
    ; __append("\n];\n\nconst postData = ")
    ; __append( JSON.stringify(postData, null, 2) )
    ; __append("\n\nmakeRequest(url, method, mimeType, headers, cookies, postData);\n")
  return __output;

},
"java/unirest": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport com.mashape.unirest.http.Unirest;\nimport com.mashape.unirest.http.exceptions.UnirestException;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Construct the request URL\n        String fullUrl = \"")
    ; __append(escapeFn( url ))
    ; __append("\";\n\n        // Set up the request\n        com.mashape.unirest.http.HttpRequestWithBody request =\n        Unirest.")
    ; __append(escapeFn( method.toLowerCase() ))
    ; __append("(fullUrl)\n            .header(\"Content-Type\", \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\");\n\n        ")
    ;  if (headers.length > 0) { 
    ; __append("\n        // Add headers to the request\n        ")
    ;  headers.forEach(header => { 
    ; __append("\n        request.header(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\");\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        ")
    ;  if (cookies.length > 0) { 
    ; __append("\n        // Add cookies to the request\n        ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n        request.cookie(\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\", \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\");\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        ")
    ;  if (postData.length > 0) { 
    ; __append("\n        // Set up the request body\n        ")
    ;  if (Array.isArray(postData)) { 
    ; __append("\n        ")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n            // Upload a file\n            request.field(\"")
    ; __append(escapeFn( postData[0].name ))
    ; __append("\", new java.io.File(\"")
    ; __append(escapeFn( postData[0].value ))
    ; __append("\"));\n        ")
    ;  } else { 
    ; __append("\n        // Send form data or raw data\n        ")
    ;  if (mimeType === 'application/x-www-form-urlencoded') { 
    ; __append("\n        ")
    ;  let params = postData.filter(param => !Array.isArray(param.value)); 
    ; __append("\n        ")
    ;  let arrays = postData.filter(param => Array.isArray(param.value)); 
    ; __append("\n        request.field(\"")
    ; __append(escapeFn( params.map(param => param.name).join("\", \"") ))
    ; __append("\",\n        ")
    ; __append(escapeFn( params.map(param => "encodeURIComponent(\"" + param.value + "\")").join(", ") ))
    ; __append("\n        ")
    ;  if (arrays.length > 0) { 
    ; __append("\n        ")
    ;  arrays.forEach(arrayParam => { 
    ; __append("\n            , \"")
    ; __append(escapeFn( arrayParam.name ))
    ; __append("[]\",\n            ")
    ; __append(escapeFn( arrayParam.value.map(val => "encodeURIComponent(\"" + val + "\")").join(", ") ))
    ; __append("\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n        );\n        ")
    ;  } else { 
    ; __append("\n        request.body(\"")
    ; __append(escapeFn( postData.map(param => param.value).join("") ))
    ; __append("\");\n        ")
    ;  } 
    ; __append("\n        ")
    ;  } 
    ; __append("\n        ")
    ;  } else if (typeof postData === 'object') { 
    ; __append("\n        // Send JSON data\n        request.body(\"")
    ; __append(escapeFn( JSON.stringify(postData) ))
    ; __append("\");\n        ")
    ;  } 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        // Send the request\n        try {\n        com.mashape.unirest.http.HttpResponse<String> response = request.asString();\n            if (response.getStatus() == 200) {\n                String responseBody = response.getBody();\n                System.out.println(\"Response: \" + responseBody);\n            } else {\n                System.out.println(\"Error: \" + response.getStatusText());\n            }\n        } catch (UnirestException e) {\n            System.out.println(\"Exception: \" + e.getMessage());\n        }\n    }\n}\n")
  return __output;

},
"java/okhttp": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport java.io.IOException;\nimport okhttp3.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        // Construct the request URL\n        String fullUrl = \"")
    ; __append(escapeFn( url ))
    ; __append("\";\n\n        // Set up the request\n        OkHttpClient client = new OkHttpClient();\n        Request.Builder requestBuilder = new Request.Builder()\n            .url(fullUrl)\n            .method(\"")
    ; __append(escapeFn( method ))
    ; __append("\", null)\n            .addHeader(\"Content-Type\", \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\");\n\n        ")
    ;  if (headers.length > 0) { 
    ; __append("\n        // Add headers to the request\n        ")
    ;  headers.forEach(header => { 
    ; __append("\n        requestBuilder.addHeader(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\");\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        ")
    ;  if (cookies.length > 0) { 
    ; __append("\n        // Add cookies to the request\n        ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n        requestBuilder.addHeader(\"Cookie\", \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\");\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        ")
    ;  if (postData.length > 0) { 
    ; __append("\n        // Set up the request body\n        ")
    ;  if (Array.isArray(postData)) { 
    ; __append("\n        FormBody.Builder formBodyBuilder = new FormBody.Builder();\n        ")
    ;  postData.forEach(param => { 
    ; __append("\n        formBodyBuilder.add(\"")
    ; __append(escapeFn( param.name ))
    ; __append("\", \"")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append("\");\n        ")
    ;  }) 
    ; __append("\n        RequestBody requestBody = formBodyBuilder.build();\n        requestBuilder.post(requestBody);\n        ")
    ;  } else { 
    ; __append("\n        MediaType mediaType = MediaType.parse(\"")
    ; __append(escapeFn( mimeType ))
    ; __append("\");\n        String requestBodyJson = \"")
    ; __append(escapeFn( JSON.stringify(postData) ))
    ; __append("\";\n        RequestBody requestBody = RequestBody.create(requestBodyJson, mediaType);\n        requestBuilder.post(requestBody);\n        ")
    ;  } 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        // Send the request\n        Request request = requestBuilder.build();\n        Response response = client.newCall(request).execute();\n\n        // Handle the response\n        if (response.isSuccessful()) {\n            String responseBody = response.body().string();\n            System.out.println(\"Response: \" + responseBody);\n        } else {\n            System.out.println(\"Error: \" + response.code() + \" \" + response.message());\n        }\n\n        // Clean up\n        response.close();\n    }\n}\n")
  return __output;

},
"java/nethttp": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport java.io.IOException;\nimport java.io.InputStream;\nimport java.io.InputStreamReader;\nimport java.io.BufferedReader;\nimport java.net.HttpURLConnection;\nimport java.net.URL;\nimport java.net.URLEncoder;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        // Construct the request URL\n        String fullUrl = \"")
    ; __append(escapeFn( url ))
    ; __append("\";\n\n        // Set up the request\n        URL url = new URL(fullUrl);\n        HttpURLConnection connection = (HttpURLConnection) url.openConnection();\n        connection.setRequestMethod(\"")
    ; __append(escapeFn( method ))
    ; __append("\");\n        connection.setRequestProperty(\"Content-Type\", \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\");\n\n        ")
    ;  if (headers.length > 0) { 
    ; __append("\n        // Add headers to the request\n        ")
    ;  headers.forEach(header => { 
    ; __append("\n        connection.setRequestProperty(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\");\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        ")
    ;  if (cookies.length > 0) { 
    ; __append("\n        // Add cookies to the request\n        ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n        connection.setRequestProperty(\"Cookie\", \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\");\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        ")
    ;  if (postData.length > 0) { 
    ; __append("\n        // Set up the request body\n        connection.setDoOutput(true);\n        ")
    ;  if (Array.isArray(postData)) { 
    ; __append("\n        String requestBody = \"")
    ; __append(escapeFn( postData.map(param => param.name + '=' + encodeURIComponent(param.value, "UTF-8")).join('&') ))
    ; __append("\";\n        ")
    ;  } else { 
    ; __append("\n        String requestBody = new Gson().toJson(")
    ; __append(escapeFn( JSON.stringify(postData) ))
    ; __append(");\n        ")
    ;  } 
    ; __append("\n        connection.getOutputStream().write(requestBody.getBytes(\"UTF-8\"));\n        ")
    ;  } 
    ; __append("\n\n        // Send the request\n        connection.connect();\n\n        // Handle the response\n        int responseCode = connection.getResponseCode();\n        if (responseCode == 200) {\n            InputStream inputStream = connection.getInputStream();\n            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));\n\n            StringBuilder responseBody = new StringBuilder();\n            String line;\n\n            while ((line = reader.readLine()) != null) {\n                responseBody.append(line);\n                responseBody.append(\"\\n\");\n            }\n\n            System.out.println(\"Response: \" + responseBody.toString());\n        } else {\n            System.out.println(\"Error: \" + responseCode + \" \" + connection.getResponseMessage());\n        }\n\n        // Clean up\n        connection.disconnect();\n    }\n}\n")
  return __output;

},
"java/asynchttp": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport org.asynchttpclient.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        // Construct the request URL\n        String fullUrl = \"")
    ; __append(escapeFn( url ))
    ; __append("\";\n\n        // Set up the request\n        AsyncHttpClient client = Dsl.asyncHttpClient();\n        RequestBuilder requestBuilder = new RequestBuilder(\"")
    ; __append(escapeFn( method ))
    ; __append("\")\n        .setUrl(fullUrl)\n        .addHeader(\"Content-Type\", \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\");\n\n        ")
    ;  if (headers.length > 0) { 
    ; __append("\n        // Add headers to the request\n        ")
    ;  headers.forEach(header => { 
    ; __append("\n        requestBuilder.addHeader(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\");\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        ")
    ;  if (cookies.length > 0) { 
    ; __append("\n        // Add cookies to the request\n        ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n        requestBuilder.addCookie(\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\", \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\");\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        ")
    ;  if (postData.length > 0) { 
    ; __append("\n            // Set up the request body\n        ")
    ;  if (postData.length > 0) { 
    ; __append("\n        ")
    ;  if (Array.isArray(postData)) { 
    ; __append("\n        StringBuilder bodyBuilder = new StringBuilder();\n        ")
    ;  postData.forEach(param => { 
    ; __append("\n        bodyBuilder.append(\"")
    ; __append(escapeFn( param.name ))
    ; __append("\").append(\"=\").append(\"Uri.EscapeDataString(")
    ; __append(escapeFn( param.value ))
    ; __append(")\").append(\"&\");\n        ")
    ;  }) 
    ; __append("\n        String body = bodyBuilder.toString();\n        requestBuilder.setBody(body.substring(0, body.length() - 1));\n        ")
    ;  } else { 
    ; __append("\n        String body = new Gson().toJson(")
    ; __append(escapeFn( JSON.stringify(postData) ))
    ; __append(");\n        requestBuilder.setBody(body);\n        ")
    ;  } 
    ; __append("\n        ")
    ;  } 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        // Send the request\n        ListenableFuture<Response> future = client.executeRequest(requestBuilder.build());\n\n        // Handle the response\n        Response response = future.get();\n        String responseBody = response.getResponseBody();\n        System.out.println(\"Response: \" + responseBody);\n\n        // Handle errors\n        if (response.getStatusCode() != 200) {\n        System.out.println(\"Error: \" + response.getStatusCode() + \" \" + response.getStatusText());\n        }\n\n        // Clean up\n        client.close();\n    }\n}\n")
  return __output;

},
"http/rfc7230": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n// https://www.rfc-editor.org/rfc/rfc7230\n")
    ;  if (method === 'GET') { 
    ; __append("\n")
    ; __append(escapeFn( method ))
    ; __append(" ")
    ; __append(escapeFn( url ))
    ; __append(" HTTP/1.1\n")
    ;  } else { 
    ; __append("\n")
    ; __append(escapeFn( method ))
    ; __append(" ")
    ; __append(escapeFn( url ))
    ; __append(" HTTP/1.1\nContent-Type: ")
    ; __append(escapeFn( mimeType ))
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  headers.forEach(header => { 
    ; __append("\n")
    ; __append(escapeFn( header.name ))
    ; __append(": ")
    ; __append(escapeFn( header.value ))
    ; __append("\n")
    ;  }) 
    ; __append("\n\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\nCookie: ")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\n")
    ;  }) 
    ; __append("\n\n")
    ;  if (method === 'POST' && postData.length > 0) { 
    ; __append("\n")
    ;  if (mimeType === 'application/x-www-form-urlencoded') { 
    ; __append("\n")
    ; __append(escapeFn( postData.map(param => param.name + '=' + encodeURIComponent(Array.isArray(param.value) || typeof param.value === 'object' ? JSON.stringify(param.value) : param.value)).join('&') ))
    ; __append("\n")
    ;  } else if (mimeType === 'application/json') { 
    ; __append("\n")
    ; __append(escapeFn( JSON.stringify(postData) ))
    ; __append("\n")
    ;  } else if (mimeType === 'multipart/form-data') { 
    ; __append("\n")
    ;  postData.forEach(param => { 
    ; __append("\n--")
    ; __append(escapeFn( 'boundary-' + Math.random().toString().substr(2) ))
    ; __append("\nContent-Disposition: form-data; name=\"")
    ; __append(escapeFn( param.name ))
    ; __append("\"\n\n")
    ; __append(escapeFn( Array.isArray(param.value) || typeof param.value === 'object' ? JSON.stringify(param.value) : param.value ))
    ; __append("\n")
    ;  }) 
    ; __append("\n--")
    ; __append(escapeFn( 'boundary-' + Math.random().toString().substr(2) ))
    ; __append("-->\n")
    ;  } else { 
    ; __append("\n")
    ;  postData.forEach(param => { 
    ; __append("\n")
    ; __append(escapeFn( param.name ))
    ; __append(": ")
    ; __append(escapeFn( param.value ))
    ; __append("\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n")
    ;  } 
    ; __append("\n")
  return __output;

},
"go/http": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n\npackage main\n\nimport (\n	\"bytes\"\n	\"fmt\"\n	\"io\"\n	\"io/ioutil\"\n	\"mime/multipart\"\n	\"net/http\"\n	\"net/url\"\n	\"strings\"\n)\n\nfunc main() {\n	// Construct the request URL\n	url := \"")
    ; __append(escapeFn( url ))
    ; __append("\"\n\n	// Construct the request body\n	var body io.Reader\n	")
    ;  if (postData.length > 0) { 
    ; __append("\n    ")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n	// Construct the form data\n	file, header, err := r.FormFile(\"file\")\n	if err != nil {\n		fmt.Println(err)\n		return\n	}\n	defer file.Close()\n	formData := &bytes.Buffer{}\n	writer := multipart.NewWriter(formData)\n	part, err := writer.CreateFormFile(\"file\", header.Filename)\n	if err != nil {\n		fmt.Println(err)\n		return\n	}\n	io.Copy(part, file)\n	writer.Close()\n	body = formData\n	")
    ;  } else { 
    ; __append("\n	form := url.Values{}\n	")
    ;  postData.forEach(param => { 
    ; __append("\n	")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n	")
    ;  param.value.forEach(value => { 
    ; __append("\n	form.Add(\"")
    ; __append(escapeFn( param.name ))
    ; __append("[]\", fmt.Sprintf(\"%v\", \"")
    ; __append(escapeFn(value))
    ; __append("\"))\n	")
    ;  }) 
    ; __append("\n	")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n	")
    ;  Object.keys(param.value).forEach(key => { 
    ; __append("\n	form.Add(\"")
    ; __append(escapeFn( param.name ))
    ; __append("[")
    ; __append(escapeFn( key ))
    ; __append("]\", fmt.Sprintf(\"%v\", \"")
    ; __append(escapeFn(param.value[key]))
    ; __append("\"))\n	")
    ;  }) 
    ; __append("\n	")
    ;  } else { 
    ; __append("\n	form.Add(\"")
    ; __append(escapeFn( param.name ))
    ; __append("\", fmt.Sprintf(\"%v\", \"")
    ; __append(escapeFn(param.value))
    ; __append("\"))\n	")
    ;  } 
    ; __append("\n	")
    ;  }) 
    ; __append("\n	body = strings.NewReader(form.Encode())\n	")
    ;  } 
    ; __append("\n	")
    ;  } else { 
    ; __append("\n	body = nil\n	")
    ;  } 
    ; __append("\n\n	// Create a new HTTP request\n	req, err := http.NewRequest(\"")
    ; __append(escapeFn( method ))
    ; __append("\", url, body)\n	if err != nil {\n		fmt.Println(err)\n		return\n	}\n\n	")
    ;  if (headers.length > 0) { 
    ; __append("\n	// Add headers to the request\n	")
    ;  headers.forEach(header => { 
    ; __append("\n	req.Header.Set(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\")\n	")
    ;  }) 
    ; __append("\n	")
    ;  } 
    ; __append("\n\n	")
    ;  if (cookies.length > 0) { 
    ; __append("\n	// Add cookies to the request\n	")
    ;  cookies.forEach(cookie => { 
    ; __append("\n	req.AddCookie(&http.Cookie{Name: \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\", Value: \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\"})\n	")
    ;  }) 
    ; __append("\n	")
    ;  } 
    ; __append("\n\n	// Send the request and get the response\n	client := &http.Client{}\n	resp, err := client.Do(req)\n	if err != nil {\n		fmt.Println(err)\n		return\n	}\n	defer resp.Body.Close()\n\n	// Handle the response\n	fmt.Println(\"Response:\")\n	respBody, err := ioutil.ReadAll(resp.Body)\n	if err != nil {\n		fmt.Println(err)\n		return\n	}\n	fmt.Println(string(respBody))\n}\n")
  return __output;

},
"go/fasthttp": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\npackage main\n\nimport (\n    \"fmt\"\n    \"mime/multipart\"\n    \"os\"\n    \"strings\"\n    \"encoding/json\"\n    \"github.com/valyala/fasthttp\"\n)\n\nfunc main() {\n    // Construct the request URL\n    url := \"")
    ; __append(escapeFn( url ))
    ; __append("\"\n\n    // Construct the request body\n    var body *strings.Reader\n    ")
    ;  if (postData.length > 0) { 
    ; __append("\n    ")
    ;  if (Array.isArray(postData) && postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n    // Construct the form data\n    file, err := os.Open(\"")
    ; __append(escapeFn( postData[0].value ))
    ; __append("\")\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    defer file.Close()\n    formData := &fasthttp.Args{}\n    writer := multipart.NewWriter(formData)\n    part, err := writer.CreateFormFile(\"file\", file.Name())\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    io.Copy(part, file)\n    writer.Close()\n    body = strings.NewReader(formData.String())\n    ")
    ;  } else { 
    ; __append("\n    ")
    ;  if (Array.isArray(postData)) { 
    ; __append("\n    var params []string\n    ")
    ;  postData.forEach(param => { 
    ; __append("\n    ")
    ;  if (typeof param.value === 'object') { 
    ; __append("\n    paramValue, err := json.Marshal(param.value)\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    params = append(params, fmt.Sprintf(\"%s=%s\", param.name, paramValue))\n    ")
    ;  } else { 
    ; __append("\n    params = append(params, fmt.Sprintf(\"%s=%s\", param.name, param.value))\n    ")
    ;  } 
    ; __append("\n    ")
    ;  }) 
    ; __append("\n    bodyStr := strings.Join(params, \"&\")\n    ")
    ;  } else { 
    ; __append("\n    bodyStr, err := json.Marshal(postData)\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    ")
    ;  } 
    ; __append("\n    body = strings.NewReader(bodyStr)\n    ")
    ;  } 
    ; __append("\n    ")
    ;  } 
    ; __append("\n\n    // Create a new HTTP request\n    req := fasthttp.AcquireRequest()\n    defer fasthttp.ReleaseRequest(req)\n    req.Header.SetMethod(\"")
    ; __append(escapeFn( method ))
    ; __append("\")\n    req.Header.SetContentType(\"")
    ; __append(escapeFn( mimeType ))
    ; __append("\")\n    req.Header.Add(\"User-Agent\", \"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36\")\n\n    ")
    ;  if (headers.length > 0) { 
    ; __append("\n    // Add headers to the request\n    ")
    ;  headers.forEach(header => { 
    ; __append("\n    req.Header.Add(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\")\n    ")
    ;  }) 
    ; __append("\n    ")
    ;  } 
    ; __append("\n\n    ")
    ;  if (cookies.length > 0) { 
    ; __append("\n    // Add cookies to the request\n    ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    req.Header.AddCookie(&fasthttp.Cookie{Name: \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\", Value: \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\"})\n    ")
    ;  }) 
    ; __append("\n    ")
    ;  } 
    ; __append("\n\n    // Send the request\n    resp := fasthttp.AcquireResponse()\n    defer fasthttp.ReleaseResponse(resp)\n    if body != nil {\n        req.SetBodyReader(body)\n    }\n    req.URI().Update(url)\n    err := fasthttp.Do(req, resp)\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n\n    // Handle the response\n    fmt.Printf(\"Response: %s\\n\", resp.Body())\n}\n")
  return __output;

},
"dart/http": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nimport 'package:http/http.dart' as http;\n\nFuture<String> makeRequest(String url, String method, String mimeType,\n                            Map<String, String> headers, Map<String, String> cookies,\n                            List<Map<String, dynamic>> postData) async {\n    // Construct the request\n    final request = http.Request(method, Uri.parse(url));\n    request.headers.addAll(headers);\n\n    // Add cookies to the request\n    cookies.forEach((name, value) {\n        request.cookies.add(Cookie(name, value));\n    });\n\n    // Add post data to the request\n    if (postData.isNotEmpty) {\n    if (postData.length == 1 && postData[0]['type'] == 'file') {\n        // Handle file upload\n        final fileUploadRequest = http.MultipartRequest(method, Uri.parse(url));\n        postData.forEach((param) async {\n            if (param['type'] == 'file') {\n                fileUploadRequest.files.add(await http.MultipartFile.fromPath(param['name'], param['value']));\n            } else {\n                fileUploadRequest.fields[param['name']] = param['value'].toString();\n            }\n        });\n        final response = await fileUploadRequest.send();\n        final responseBody = await response.stream.bytesToString();\n        return responseBody;\n    } else {\n    // Handle regular post data\n    final postDataString = postData.map((param) {\n    if (param['value'] is List) {\n    if (param['value'].isNotEmpty && param['value'][0] is List) {\n    // Handle array of arrays\n        final nestedArrayString = param['value'].map((nestedArray) {\n        return nestedArray.map((element) => '${Uri.encodeComponent(element.toString())}').join(',');\n            }).join(';');\n            return '${param['name']}=$nestedArrayString';\n    } else {\n        // Handle array of objects\n        final nestedObjectString = param['value'].map((nestedObject) {\n        return nestedObject.entries.map((entry) {\n        return '${Uri.encodeComponent('${entry.key}')}=${Uri.encodeComponent('${entry.value}')}';\n            }).join('&');\n        }).join(';');\n            return '${param['name']}=$nestedObjectString';\n        }\n    } else if (param['value'] is Map) {\n        // Handle object\n        return param['value'].entries.map((entry) {\n        return '${Uri.encodeComponent('${entry.key}')}=${Uri.encodeComponent('${entry.value}')}';\n        }).join('&');\n    } else {\n        // Handle string or number\n        return '${param['name']}=${Uri.encodeComponent(param['value'].toString())}';\n        }\n        }).join('&');\n        request.body = postDataString;\n        request.headers['Content-Type'] = mimeType;\n        final response = await request.send();\n        final responseBody = await response.stream.bytesToString();\n        return responseBody;\n    }\n    } else {\n        // Handle GET request\n        final response = await request.send();\n        final responseBody = await response.stream.bytesToString();\n        return responseBody;\n    }\n}\n\n// Example usage\nvoid main() async {\n    final url = '")
    ; __append(escapeFn( url ))
    ; __append("';\n    final method = '")
    ; __append(escapeFn( method ))
    ; __append("';\n    final mimeType = '")
    ; __append(escapeFn( mimeType ))
    ; __append("';\n    final headers = {\n    ")
    ;  headers.forEach(header => { 
    ; __append("\n        '")
    ; __append(escapeFn( header.name ))
    ; __append("' : '")
    ; __append(escapeFn( header.value ))
    ; __append("',\n    ")
    ;  }) 
    ; __append("\n    };\n    final cookies = {\n    ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n        '")
    ; __append(escapeFn( cookie.name ))
    ; __append("' : '")
    ; __append(escapeFn( cookie.value ))
    ; __append("',\n    ")
    ;  }) 
    ; __append("\n    };\n    final postData = [\n    ")
    ;  postData.forEach(param => { 
    ; __append("\n        {\n        'name': '")
    ; __append(escapeFn( param.name ))
    ; __append("',\n        'value': ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(",\n        'type': '")
    ; __append(escapeFn( param.type ))
    ; __append("'\n        },\n    ")
    ;  }) 
    ; __append("\n    ];\n\n    final response = await makeRequest(url, method, mimeType, headers, cookies, postData);\n    print('Response: $response');\n}\n")
  return __output;

},
"dart/dio": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n#include <iostream>\n#include <string>\n#include <vector>\n#include <curl/curl.h>\n\nstd::string makeRequest(const std::string& url, const std::string& method,\n                         const std::string& mimeType, const std::vector<std::string>& headers,\n                         const std::vector<std::string>& cookies, const std::vector<std::string>& postData) {\n    // Set up the request\n    curl_global_init(CURL_GLOBAL_ALL);\n    auto curl = curl_easy_init();\n    if (curl) {\n        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());\n        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, method.c_str());\n        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);\n        if (!cookies.empty()) {\n            curl_easy_setopt(curl, CURLOPT_COOKIE, cookies[0].c_str());\n        }\n        if (!postData.empty()) {\n            ")
    ;  if (postData.some(param => typeof param.value === 'object' || Array.isArray(param.value))) { 
    ; __append("\n            std::string body = R\"({")
    ; 
                postData.forEach(param => {
                    if (typeof param.value === 'object' || Array.isArray(param.value)) {
                        
    ; __append("\n                        \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" : ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(",\n                        ")
    ;  } else { 
    ; __append("\n                        \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" : \"")
    ; __append(escapeFn( param.value ))
    ; __append("\",\n                        ")
    ;  }
                });
            
    ; __append("})\";\n            curl_easy_setopt(curl, CURLOPT_POSTFIELDS, body.c_str());\n            ")
    ;  } else { 
    ; __append("\n            curl_easy_setopt(curl, CURLOPT_POSTFIELDS, postData[0].c_str());\n            ")
    ;  } 
    ; __append("\n        }\n\n        // Send the request\n        CURLcode res = curl_easy_perform(curl);\n        if (res != CURLE_OK) {\n            std::cerr << \"Error: \" << curl_easy_strerror(res) << std::endl;\n        }\n\n        // Handle the response\n        long responseCode;\n        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &responseCode);\n        std::string response = std::to_string(responseCode);\n        curl_easy_cleanup(curl);\n        curl_global_cleanup();\n\n        return response;\n    }\n}\n\n// Example usage\nint main() {\n    std::string url = \"")
    ; __append(escapeFn( url ))
    ; __append("\";\n    std::string method = \"")
    ; __append(escapeFn( method ))
    ; __append("\";\n    std::string mimeType = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\";\n    std::vector<std::string> headers = {\n        ")
    ;  headers.forEach(header => { 
    ; __append("\n        \"")
    ; __append(escapeFn( header.name ))
    ; __append(": ")
    ; __append(escapeFn( header.value ))
    ; __append("\",\n        ")
    ;  }) 
    ; __append("\n    };\n    std::vector<std::string> cookies = {\n        ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n        \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\",\n        ")
    ;  }) 
    ; __append("\n    };\n    std::vector<std::string> postData = {\n        ")
    ;  postData.forEach(param => { 
    ; __append("\n        {\n            \"name\": \"")
    ; __append(escapeFn( param.name ))
    ; __append("\",\n            ")
    ;  if (typeof param.value === 'object' || Array.isArray(param.value)) { 
    ; __append("\n            \"value\": ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append("\n            ")
    ;  } else { 
    ; __append("\n            \"value\": \"")
    ; __append(escapeFn( param.value ))
    ; __append("\"\n            ")
    ;  } 
    ; __append("\n        },\n        ")
    ;  }) 
    ; __append("\n    };\n\n    std::string response = makeRequest(url, method, mimeType, headers, cookies, postData);\n    std::cout << \"Response Code: \" << response << std::endl;\n    return 0;\n}\n")
  return __output;

},
"csharp/restsharp": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nusing RestSharp;\n\nclass Program\n{\n    static void Main(string[] args)\n    {\n        // Construct the request URL\n        var fullUrl = \"")
    ; __append(escapeFn( url ))
    ; __append("\";\n\n        // Set up the request\n        var client = new RestClient(fullUrl);\n        var request = new RestRequest(\"")
    ; __append(escapeFn( method ))
    ; __append("\", Method.")
    ; __append(escapeFn( method.toUpperCase() ))
    ; __append(");\n        request.AddHeader(\"Content-Type\", \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\");\n\n        ")
    ;  if (headers.length > 0) { 
    ; __append("\n        // Add headers to the request\n        ")
    ;  headers.forEach(header => { 
    ; __append("\n        request.AddHeader(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\");\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        ")
    ;  if (cookies.length > 0) { 
    ; __append("\n        // Add cookies to the request\n        ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n        request.AddCookie(\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\", \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\");\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        ")
    ;  if (postData.length > 0) { 
    ; __append("\n        // Set up the request body\n        ")
    ;  if (postData.some(param => typeof param.value === 'object' || Array.isArray(param.value))) { 
    ; __append("\n        var body = new {\n            ")
    ;  postData.filter(param => typeof param.value === 'object' || Array.isArray(param.value)).forEach(param => { 
    ; __append("\n            ")
    ; __append(escapeFn( param.name ))
    ; __append(" = ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(",\n            ")
    ;  }) 
    ; __append("\n        };\n        request.AddJsonBody(body);\n        ")
    ;  } else { 
    ; __append("\n        request.AddParameter(\"text/plain\", \"")
    ; __append(escapeFn( postData.map(param => param.name + '=' + Uri.EscapeDataString(param.value)).join('&') ))
    ; __append("\", ParameterType.RequestBody);\n        ")
    ;  } 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        // Send the request\n        var response = client.Execute(request);\n\n        // Handle the response\n        var responseBody = response.Content;\n        Console.WriteLine(\"Response: \" + responseBody);\n\n        // Handle errors\n        if (response.StatusCode != System.Net.HttpStatusCode.OK)\n        {\n            Console.WriteLine(\"Error: \" + response.StatusCode + \" \" + response.StatusDescription);\n        }\n    }\n}\n")
  return __output;

},
"csharp/httpclient": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nusing System;\nusing System.Net.Http;\nusing System.Threading.Tasks;\n\nclass Program\n{\n    static async Task Main(string[] args)\n    {\n        // Construct the request URL\n        var fullUrl = \"")
    ; __append(escapeFn( url ))
    ; __append("\";\n\n        // Set up the request\n        var client = new HttpClient();\n        var request = new HttpRequestMessage(new HttpMethod(\"")
    ; __append(escapeFn( method ))
    ; __append("\"), fullUrl);\n        request.Headers.Add(\"Content-Type\", \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\");\n\n        ")
    ;  if (headers.length > 0) { 
    ; __append("\n        // Add headers to the request\n        ")
    ;  headers.forEach(header => { 
    ; __append("\n        request.Headers.Add(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\");\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        ")
    ;  if (cookies.length > 0) { 
    ; __append("\n        // Add cookies to the request\n        ")
    ;  cookies.forEach(cookie => { 
    ; __append("\n        var cookie = new System.Net.Cookie(\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\", \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\", \"/\", \"")
    ; __append(escapeFn( url ))
    ; __append("\");\n        clientHandler.CookieContainer.Add(cookie);\n        ")
    ;  }) 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        ")
    ;  if (postData.length > 0) { 
    ; __append("\n        // Set up the request body\n        ")
    ;  if (postData.some(param => typeof param.value === 'object' || Array.isArray(param.value))) { 
    ; __append("\n        var formData = new MultipartFormDataContent();\n        ")
    ;  postData.forEach(param => {
            if (Array.isArray(param.value)) { 
    ; __append("\n                ")
    ;  param.value.forEach(val => { 
    ; __append("\n                    formData.Add(new StringContent(\"")
    ; __append(escapeFn( val ))
    ; __append("\"), \"")
    ; __append(escapeFn( param.name ))
    ; __append("[]\");\n                ")
    ;  }) 
    ; __append("\n            ")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n                ")
    ;  Object.entries(param.value).forEach(([key, val]) => { 
    ; __append("\n                    formData.Add(new StringContent(\"")
    ; __append(escapeFn( val ))
    ; __append("\"), \"")
    ; __append(escapeFn( param.name ))
    ; __append("[")
    ; __append(escapeFn( key ))
    ; __append("]\");\n                ")
    ;  }) 
    ; __append("\n            ")
    ;  } else { 
    ; __append("\n                formData.Add(new StringContent(\"")
    ; __append(escapeFn( param.value ))
    ; __append("\"), \"")
    ; __append(escapeFn( param.name ))
    ; __append("\");\n            ")
    ;  } 
    ; __append("\n        ")
    ;  }) 
    ; __append("\n        request.Content = formData;\n        ")
    ;  } else { 
    ; __append("\n        var requestBody = new StringContent(\"")
    ; __append(escapeFn( postData.map(param => param.name + '=' + Uri.EscapeDataString(param.value)).join('&') ))
    ; __append("\");\n        request.Content = requestBody;\n        ")
    ;  } 
    ; __append("\n        ")
    ;  } 
    ; __append("\n\n        // Send the request\n        var response = await client.SendAsync(request);\n\n        // Handle the response\n        var responseBody = await response.Content.ReadAsStringAsync();\n        Console.WriteLine(\"Response: \" + responseBody);\n\n        // Handle errors\n        if (!response.IsSuccessStatusCode)\n        {\n            Console.WriteLine(\"Error: \" + response.StatusCode + \" \" + response.ReasonPhrase);\n        }\n    }\n}\n")
  return __output;

},
"cpp/iostream": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n// Construct the request URL\nstd::string fullUrl = \"")
    ; __append( url )
    ; __append("\";\n\n// Set up the request headers\nstd::map<std::string, std::string> headers;\n")
    ;  headers.forEach(header => { 
    ; __append("\nheaders[\"")
    ; __append(escapeFn( header.name ))
    ; __append("\"] = \"")
    ; __append(escapeFn( header.value ))
    ; __append("\";\n")
    ;  }) 
    ; __append("\n\n// Add cookies to the request\nstd::string cookieString;\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\ncookieString += \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("; \";\n")
    ;  }) 
    ; __append("\n\n// Set up the request parameters\nstd::map<std::string, std::string> parameters;\n")
    ;  postData.forEach(param => { 
    ; __append("\n")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n")
    ;  param.value.forEach(val => { 
    ; __append("\nstd::string paramString = \"")
    ; __append(escapeFn( param.name ))
    ; __append("[]=")
    ; __append(escapeFn( val ))
    ; __append("\";\nparameters[\"")
    ; __append(escapeFn( param.name ))
    ; __append("\"] += paramString + \"&\";\n")
    ;  }) 
    ; __append("\n")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n")
    ;  Object.entries(param.value).forEach(([key, val]) => { 
    ; __append("\nstd::string paramString = \"")
    ; __append(escapeFn( param.name ))
    ; __append("[")
    ; __append(escapeFn( key ))
    ; __append("]=")
    ; __append(escapeFn( val ))
    ; __append("\";\nparameters[\"")
    ; __append(escapeFn( param.name ))
    ; __append("\"] += paramString + \"&\";\n")
    ;  }) 
    ; __append("\n")
    ;  } else { 
    ; __append("\nstd::string paramString = \"")
    ; __append(escapeFn( param.name ))
    ; __append("=")
    ; __append(escapeFn( param.value ))
    ; __append("\";\nparameters[\"")
    ; __append(escapeFn( param.name ))
    ; __append("\"] += paramString + \"&\";\n")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n\n// Construct the request\nstd::string method = \"")
    ; __append(escapeFn( method ))
    ; __append("\";\nstd::string postDataString;\nif (method == \"GET\") {\n    // Construct GET request with parameters\n} else if (method == \"POST\") {\n    // Construct POST request with postDataString\n} else if (method == \"PUT\") {\n    // Construct PUT request with parameters\n} else if (method == \"DELETE\") {\n    // Construct DELETE request with parameters\n} else {\n    // Handle unsupported methods\n}\n\n// Print the request\nstd::cout << method << \" \" << fullUrl << \" HTTP/1.1\\r\\n\";\nfor (auto const& [key, val] : headers) {\n    std::cout << key << \": \" << val << \"\\r\\n\";\n}\nif (!cookieString.empty()) {\n    // Print cookies\n    std::cout << \"Cookie: \" << cookieString << \"\\r\\n\";\n}\nstd::cout << \"\\r\\n\";\nif (method == \"POST\" || method == \"PUT\" || method == \"DELETE\") {\n    std::cout << postDataString << \"\\r\\n\";\n}\n")
  return __output;

},
"cpp/curl": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n// Construct the request URL\nstd::string url = \"")
    ; __append( url )
    ; __append("\";\n\n// Set up the request headers\nstruct curl_slist* headers = NULL;\n")
    ;  headers.forEach(header => { 
    ; __append("\nstd::string headerString = \"")
    ; __append(escapeFn( header.name ))
    ; __append(": ")
    ; __append(escapeFn( header.value ))
    ; __append("\";\nheaders = curl_slist_append(headers, headerString.c_str());\n")
    ;  }) 
    ; __append("\n\n// Add cookies to the request\nstd::string cookieData;\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\nstd::string cookieString = \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\";\ncookieData += cookieString + \"; \";\n")
    ;  }) 
    ; __append("\n\n// Set up the request parameters\nstd::string postData;\n")
    ;  postData.forEach(param => { 
    ; __append("\n")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n")
    ;  param.value.forEach(val => { 
    ; __append("\nstd::string paramString = \"")
    ; __append(escapeFn( param.name ))
    ; __append("[]=")
    ; __append(escapeFn( val ))
    ; __append("\";\npostData += paramString + \"&\";\n")
    ;  }) 
    ; __append("\n")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n")
    ;  Object.entries(param.value).forEach(([key, val]) => { 
    ; __append("\nstd::string paramString = \"")
    ; __append(escapeFn( param.name ))
    ; __append("[")
    ; __append(escapeFn( key ))
    ; __append("]=")
    ; __append(escapeFn( val ))
    ; __append("\";\npostData += paramString + \"&\";\n")
    ;  }) 
    ; __append("\n")
    ;  } else { 
    ; __append("\nstd::string paramString = \"")
    ; __append(escapeFn( param.name ))
    ; __append("=")
    ; __append(escapeFn( param.value ))
    ; __append("\";\npostData += paramString + \"&\";\n")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n\n// Construct the request\nCURL* curl = curl_easy_init();\nif (curl) {\n    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());\n    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);\n\n    if (!cookieData.empty()) {\n        curl_easy_setopt(curl, CURLOPT_COOKIE, cookieData.c_str());\n    }\n\n    if (postData.length() > 0) {\n        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, postData.c_str());\n    }\n\n    // Perform the request\n    CURLcode res = curl_easy_perform(curl);\n\n    // Handle errors\n    if (res != CURLE_OK) {\n        fprintf(stderr, \"curl_easy_perform() failed: %s\\n\", curl_easy_strerror(res));\n    }\n\n    // Cleanup\n    curl_slist_free_all(headers);\n    curl_easy_cleanup(curl);\n}\n")
  return __output;

},
"cpp/arduino": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n// Construct the request URL\nString url = \"")
    ; __append( url )
    ; __append("\";\n\n// Set up the request headers\nString headers;\n")
    ;  headers.forEach(header => { 
    ; __append("\n    String headerString = \"")
    ; __append(escapeFn( header.name ))
    ; __append(": ")
    ; __append(escapeFn( header.value ))
    ; __append("\";\n    headers += headerString + \"\\r\\n\";\n")
    ;  }) 
    ; __append("\n\n// Add cookies to the request\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    String cookieString = \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\";\n    // TODO: Add cookieString to the request\n")
    ;  }) 
    ; __append("\n\n// Set up the request parameters\nString postData;\n")
    ;  postData.forEach(param => { 
    ; __append("\n    ")
    ;  if (Array.isArray(param.value)) { 
    ; __append("\n        ")
    ;  param.value.forEach(item => { 
    ; __append("\n            String paramString = \"")
    ; __append(escapeFn( param.name ))
    ; __append("=")
    ; __append(escapeFn( item ))
    ; __append("\";\n            postData += paramString + \"&\";\n        ")
    ;  }) 
    ; __append("\n    ")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("\n        String paramString = \"")
    ; __append(escapeFn( param.name ))
    ; __append("=")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append("\";\n        postData += paramString + \"&\";\n    ")
    ;  } else { 
    ; __append("\n        String paramString = \"")
    ; __append(escapeFn( param.name ))
    ; __append("=")
    ; __append(escapeFn( param.value ))
    ; __append("\";\n        postData += paramString + \"&\";\n    ")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n\n// Construct the request\nWiFiClient client;\nif (client.connect(url, 80)) {\n    // Send the request\n    client.print(\"")
    ; __append( method )
    ; __append(" \");\n    client.print(url);\n    client.println(\" HTTP/1.1\");\n    client.print(\"Host: \");\n    client.println(url);\n    client.print(\"Content-Type: \");\n    client.println(\"")
    ; __append( mimeType )
    ; __append("\");\n    client.print(\"Content-Length: \");\n    client.println(postData.length());\n    client.print(headers);\n    if (postData.length() > 0) {\n    client.print(\"\\r\\n\");\n    client.print(postData);\n    }\n    client.println();\n\n    // Read the response\n    while (client.connected()) {\n        String line = client.readStringUntil('\\n');\n            if (line == \"\\r\") {\n            break;\n        }\n    }\n    String response = client.readStringUntil('\\n');\n    Serial.println(\"Response: \" + response);\n}\n")
  return __output;

},
"clojure/ring-client": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n\n(require '[ring.util.http-client :as client])\n\n(defn make-request []\n    (let [url \"")
    ; __append(escapeFn( url ))
    ; __append("\"\n        headers {")
    ;  headers.forEach(header => { 
    ; __append("\n    \"")
    ; __append(escapeFn( header.name ))
    ; __append("\" \"")
    ; __append(escapeFn( header.value ))
    ; __append("\"")
    ;  if (!header.isLast) { 
    ; __append(",")
    ;  } 
    ;  }) 
    ; __append("}\n        cookies {")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\" \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\"")
    ;  if (!cookie.isLast) { 
    ; __append(",")
    ;  } 
    ;  }) 
    ; __append("}\n        options {:headers headers\n        :cookies cookies\n        :content-type \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"}\n    ")
    ;  if (method === 'GET') { 
    ; __append("\n        response (client/get url options)]\n    ")
    ;  } else { 
    ; __append("\n        post-data \"")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n    {:multipart true\n        :file \"")
    ; __append(escapeFn( postData[0].value ))
    ; __append("\"}\n    ")
    ;  } else { 
    ; __append("\n    {")
    ;  postData.forEach(param => { 
    ; __append("\n        \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" ")
    ;  if (Array.isArray(param.value) || typeof param.value === 'object') { 
    ; __append("(json/write-str param.value)")
    ;  } else { 
    ; __append("\"")
    ; __append(escapeFn( param.value ))
    ; __append("\"")
    ;  } 
    ;  if (!param.isLast) { 
    ; __append(",")
    ;  } 
    ;  }) 
    ; __append("}\n    ")
    ;  } 
    ; __append("\"\n    response (client/post url options post-data)]\n    ")
    ;  } 
    ; __append("\n    (println \"Response: \" (:body response))))\n\n(make-request)\n")
  return __output;

},
"clojure/clj-http": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n(require '[clj-http.client :as client])\n\n(defn make-request []\n    (let [url \"")
    ; __append(escapeFn( url ))
    ; __append("\"\n        headers {")
    ;  headers.forEach(header => { 
    ; __append("\n    \"")
    ; __append(escapeFn( header.name ))
    ; __append("\" \"")
    ; __append(escapeFn( header.value ))
    ; __append("\"")
    ;  if (!header.isLast) { 
    ; __append(",")
    ;  } 
    ;  }) 
    ; __append("}\n        cookies {")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\" \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\"")
    ;  if (!cookie.isLast) { 
    ; __append(",")
    ;  } 
    ;  }) 
    ; __append("}\n        options {:headers headers\n        :cookies cookies\n        :content-type \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"}\n    ")
    ;  if (method === 'GET') { 
    ; __append("\n        response (client/get url options)]\n    ")
    ;  } else { 
    ; __append("\n        post-data \"")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n    {:multipart true\n        :file \"")
    ; __append(escapeFn( postData[0].value ))
    ; __append("\"}\n    ")
    ;  } else { 
    ; __append("\n    {")
    ;  postData.forEach(param => { 
    ; __append("\n        \"")
    ; __append(escapeFn( param.name ))
    ; __append("\" ")
    ;  if (Array.isArray(param.value)) { 
    ; __append("(json/write-str param.value)")
    ;  } else if (typeof param.value === 'object') { 
    ; __append("(json/write-str param.value)")
    ;  } else { 
    ; __append("\"")
    ; __append(escapeFn( param.value ))
    ; __append("\"")
    ;  } 
    ;  if (!param.isLast) { 
    ; __append(",")
    ;  } 
    ;  }) 
    ; __append("}\n    ")
    ;  } 
    ; __append("\"\n    response (client/post url options post-data)]\n    ")
    ;  } 
    ; __append("\n    (println (str \"")
    ; __append(escapeFn( method ))
    ; __append(" \" url \" HTTP/1.1\"))\n    (doseq [entry headers]\n    (println (str entry)))\n    (doseq [entry cookies]\n    (println (str \"Cookie: \" entry)))\n    (when (not (empty? post-data))\n    (println (str post-data)))\n    (println (str \"\\nResponse: \" (:body response)))))\n\n(make-request)\n")
  return __output;

},
"c/ghttp": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n// Set up the request\nstruct evhttp_uri *uri = evhttp_uri_parse(\"")
    ; __append(escapeFn( url ))
    ; __append("\");\nstruct evhttp_connection *conn = evhttp_connection_base_new(NULL, NULL, evhttp_uri_get_host(uri), evhttp_uri_get_port(uri));\nstruct evhttp_request *req = evhttp_request_new(NULL, NULL);\n\n// Construct the request URL\nchar *path = evhttp_uri_get_path(uri);\nif(strlen(path) == 0) {\npath = \"/\";\n}\n\n// Set request method and URL\nevhttp_request_set_chunked_cb(req, NULL);\nevhttp_request_set_error_cb(req, request_error_cb);\nevhttp_request_set_cb(req, request_done_cb);\nevhttp_request_set_header_cb(req, request_header_cb);\nevhttp_request_set_response_cb(req, request_response_cb);\nevhttp_request_set_uri(req, path);\nevhttp_request_set_type(req, EVHTTP_REQ_")
    ; __append(escapeFn( method.toUpperCase() ))
    ; __append(");\n\n")
    ;  if (headers.length > 0) { 
    ; __append("\n// Add headers to the request\n")
    ;  headers.forEach(header => { 
    ; __append("\nevhttp_add_header(req->output_headers, \"")
    ; __append(escapeFn( header.name ))
    ; __append("\", \"")
    ; __append(escapeFn( header.value ))
    ; __append("\");\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  if (cookies.length > 0) { 
    ; __append("\n// Add cookies to the request\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\nevhttp_add_header(req->output_headers, \"Cookie\", \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\");\n")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  if (postData.length > 0) { 
    ; __append("\n// Set request body\n")
    ;  const postDataString = postData.map(param => {
if (Array.isArray(param.value)) {
return param.value.map(value => param.name + '=' + encodeURIComponent(JSON.stringify(value))).join('&')
} else if (typeof param.value === 'object') {
return param.name + '=' + encodeURIComponent(JSON.stringify(param.value))
} else {
return param.name + '=' + encodeURIComponent(param.value)
}
}).join('&') 
    ; __append("\nevbuffer_add_printf(req->output_buffer, \"%s\", \"")
    ; __append(escapeFn( postDataString ))
    ; __append("\");\nevhttp_add_header(req->output_headers, \"Content-Type\", \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\");\n")
    ;  } 
    ; __append("\n\n// Send the request\nif (evhttp_make_request(conn, req, EVHTTP_REQ_")
    ; __append(escapeFn( method.toUpperCase() ))
    ; __append(", path) == -1) {\nfprintf(stderr, \"Failed to send HTTP request\\n\");\nreturn 1;\n}\n\n// Handle errors\nvoid request_error_cb(struct evhttp_request *req, void *ctx) {\nfprintf(stderr, \"Error: %d %s\\n\", evhttp_request_get_response_code(req), evhttp_request_get_response_code_line(req));\n}\n\n// Handle response headers\nvoid request_header_cb(struct evhttp_request *req, void *ctx) {\nstruct evkeyvalq *headers = evhttp_request_get_input_headers(req);\nstruct evkeyval *header;\nTAILQ_FOREACH(header, headers, next) {\nfprintf(stdout, \"%s: %s\\n\", header->key, header->value);\n}\n}\n\n// Handle response body\nvoid request_response_cb(struct evhttp_request *req, void *ctx) {\nstruct evbuffer *buffer = evhttp_request_get_input_buffer(req);\nfprintf(stdout, \"%.*s\\n\", (int)evbuffer_get_length(buffer), evbuffer_pullup(buffer, -1));\n}\n\n// Handle completion of the request\nvoid request_done_cb(struct evhttp_request *req, void *ctx) {\nevent_base_loopbreak(base);\n}\n")
  return __output;

},
"c/curl": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n#include <stdio.h>\n#include <stdlib.h>\n#include <curl/curl.h>\n\nint main(void) {\nCURL *curl;\nCURLcode res;\nstruct curl_slist *headers = NULL;\nchar *url = \"")
    ; __append(escapeFn( url ))
    ; __append("\";\nchar *method = \"")
    ; __append(escapeFn( method ))
    ; __append("\";\nchar *mimeType = \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\";\nchar *postData = \"\";\n")
    ;  if (postData.length > 0) { 
    ; __append("\n")
    ;  const postDataString = postData.map(param => {
if (Array.isArray(param.value)) {
return param.value.map(value => param.name + '=' + encodeURIComponent(JSON.stringify(value))).join('&')
} else if (typeof param.value === 'object') {
return param.name + '=' + encodeURIComponent(JSON.stringify(param.value))
} else {
return param.name + '=' + encodeURIComponent(param.value)
}
}).join('&') 
    ; __append("\npostData = \"")
    ; __append(escapeFn( postDataString ))
    ; __append("\";\n")
    ;  } 
    ; __append("\n\ncurl = curl_easy_init();\nif (curl) {\n    curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, method);\n    curl_easy_setopt(curl, CURLOPT_URL, url);\n\n    if (*mimeType) {\n        char *contentType = malloc(strlen(\"Content-Type: \") + strlen(mimeType) + 1);\n        sprintf(contentType, \"Content-Type: %s\", mimeType);\n        headers = curl_slist_append(headers, contentType);\n        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);\n    }\n\n    if (*postData) {\n        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, postData);\n    }\n\n    res = curl_easy_perform(curl);\n\n    if (res != CURLE_OK) {\n        fprintf(stderr, \"curl_easy_perform() failed: %s\\n\", curl_easy_strerror(res));\n    }\n\n    curl_easy_cleanup(curl);\n}\n\nreturn 0;\n}\n")
  return __output;

},
"brainfuck/brainfuck": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\n// Create a new brainfuck program\n++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.\n\n// Construct the request URL\n,[<]>[.>],")
    ;  url.split('').forEach(char => { 
    ; __append("++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>++++++[<.+>-]<<[->+>+<<]>>[->+<]>[<.<+>-]<,")
    ;  }) 
    ; __append("++++++++[->+++++<]>.\n\n// Set up the request\n,[<]>[.>],")
    ;  method.split('').forEach(char => { 
    ; __append("++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>++++++[<.+>-]<<[->+>+<<]>>[->+<]>[<.<+>-]<,")
    ;  }) 
    ; __append("++++++++[->+++++<]>.\n\n")
    ;  if (headers.length > 0) { 
    ; __append("\n// Add headers to the request\n")
    ;  headers.forEach(header => { 
    ; __append(",[<]>[.>],'")
    ; __append(escapeFn( header.name ))
    ; __append(": ")
    ; __append(escapeFn( header.value ))
    ; __append("',")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n")
    ;  if (cookies.length > 0) { 
    ; __append("\n// Add cookies to the request\n")
    ;  cookies.forEach(cookie => { 
    ; __append(",[<]>[.>],'Set-Cookie: ")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("',")
    ;  }) 
    ; __append("\n")
    ;  } 
    ; __append("\n\n\n")
    ;  if (postData.length > 0) { 
    ; __append("\n// Send the request\n,[<]>[.>],'")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("multipart/form-data")
    ;  } else { 
    ; __append(escapeFn( mimeType ))
    ;  } 
    ; __append("',<\n\n")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n    ,[<]>[.>],'")
    ; __append(escapeFn( postData[0].name ))
    ; __append("=',<,[>]<[.>],<,[<]>[.>],<,[>]<[<]>[-]>[-]<<[->+>+<<]>>[->+<]>[<.<+>-]<,")
    ;  } else { 
    ; __append("\n    ")
    ;  postData.forEach(param => { 
    ; __append("\n        ,[<]>[.>],'")
    ; __append(escapeFn( param.name ))
    ; __append("=',<,[>]<[.>],'")
    ; __append(escapeFn( param.value ))
    ; __append("',")
    ;  }) 
    ; __append("\n    ,")
    ;  } 
    ; __append("\n\n,[<]>[.>],'',<]\n")
    ;  } 
    ; __append("\n\n// Handle the response\n,[<]>[.>],'Response:',<[<]>[.>],[<]>[-]>[-]<<[->+>+<<]>>[->+<]>[<.<+>-],<\n\n// Handle errors\n,[<]>[.>],'Error:',<[<]>[.>],'Oops! Brainfuck couldn't handle this request. Maybe try Python next time?',")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append(" Remember, uploading files in Brainfuck is like trying to fit a square peg in a round hole.")
    ;  } 
    ; __append("\n")
  return __output;

},
"bash/wget": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nwget --verbose --output-document=-\n--header=\"Content-Type: ")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\n")
    ;  headers.forEach(header => { 
    ; __append("\n    --header=\"")
    ; __append(escapeFn( header.name ))
    ; __append(": ")
    ; __append(escapeFn( header.value ))
    ; __append("\"\n")
    ;  }) 
    ; __append("\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    --header=\"Cookie: ")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\"\n")
    ;  }) 
    ;  if (method === 'GET') { 
    ; __append("\n    \"")
    ; __append(escapeFn( url ))
    ; __append("\"\n")
    ;  } else if (method === 'POST') { 
    ; __append("\n    --post-data=\"")
    ; __append(escapeFn(
    postData
            .map(param => {
                let value = param.value;
                if (Array.isArray(value) || typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                return encodeURIComponent(param.name) + '=' + encodeURIComponent(value);
            })
            .join('&')
    ))
    ; __append("\"\n    \"")
    ; __append(escapeFn( url ))
    ; __append("\"\n")
    ;  } else if (method === 'PUT') { 
    ; __append("\n    --method=PUT\n    --body-data=\"")
    ; __append(escapeFn(
    postData
            .map(param => {
                let value = param.value;
                if (Array.isArray(value) || typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                return encodeURIComponent(param.name) + '=' + encodeURIComponent(value);
            })
            .join('&')
    ))
    ; __append("\"\n    \"")
    ; __append(escapeFn( url ))
    ; __append("\"\n")
    ;  } else if (method === 'DELETE') { 
    ; __append("\n    --method=DELETE\n    \"")
    ; __append(escapeFn( url ))
    ; __append("\"\n")
    ;  } 
    ; __append("\n")
  return __output;

},
"bash/httpie": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nhttp --verbose --check --follow\n\"")
    ; __append(escapeFn( url ))
    ; __append("\"\n")
    ; __append(escapeFn( headers.map(header => "'" + header.name + ":" + header.value + "'").join(' \n ') ))
    ; __append("\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\nCookie:\"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\"\n")
    ;  }) 
    ; __append("\n")
    ;  if (postData.length > 0) { 
    ; __append("\n")
    ;  const postDataString = postData.map(param => {
if (Array.isArray(param.value)) {
return param.value.map(value => "'" + param.name + "=" + encodeURIComponent(JSON.stringify(value)) + "'").join(' ')
} else if (typeof param.value === 'object') {
return "'" + param.name + "=" + encodeURIComponent(JSON.stringify(param.value)) + "'"
} else {
return "'" + param.name + "=" + encodeURIComponent(param.value) + "'"
}
}).join(' \n ') 
    ; __append("\n")
    ; __append(escapeFn( postDataString ))
    ; __append("\n")
    ;  } 
    ; __append("\n--form\n--timeout 120s\n--max-redirects 10\n")
  return __output;

},
"bash/curl": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\ncurl -X ")
    ; __append(escapeFn( method ))
    ; __append("\n-H \"Content-Type: ")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\n")
    ;  headers.forEach(header => { 
    ; __append("\n    -H \"")
    ; __append(escapeFn( header.name ))
    ; __append(": ")
    ; __append(escapeFn( header.value ))
    ; __append("\"\n")
    ;  }) 
    ; __append("\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n    --cookie \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\"\n")
    ;  }) 
    ;  if (postData.length > 0) { 
    ; __append("\n    -d ")
    ;  if (postData.length === 1 && postData[0].type === 'file') { 
    ; __append("\n        \"@")
    ; __append(escapeFn( postData[0].value ))
    ; __append("\"\n    ")
    ;  } else { 
    ; __append("\n        \"")
    ; __append(escapeFn(
            postData
                    .map(param => {
                        let value = param.value;
                        if (Array.isArray(value)) {
                            value = JSON.stringify(value);
                        } else if (typeof value === 'object') {
                            value = JSON.stringify(value);
                        }
                        return encodeURIComponent(param.name) + '=' + encodeURIComponent(value)
                    })
                    .join('&')
        ))
    ; __append("\"\n    ")
    ;  } 
    ;  } 
    ; __append("\n\"")
    ; __append(escapeFn( url ))
    ; __append("\"\n")
  return __output;

},
"r/rcurl": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nlibrary(RCurl)\n\nurl <- \"")
    ; __append(escapeFn( url ))
    ; __append("\"\nmethod <- \"")
    ; __append(escapeFn( method ))
    ; __append("\"\nmimeType <- \"")
    ; __append(escapeFn( mimeType ))
    ; __append("\"\n\nheaders <- list(\n")
    ;  headers.forEach(header => { 
    ; __append("\n  \"")
    ; __append(escapeFn( header.name ))
    ; __append("\" = \"")
    ; __append(escapeFn( header.value ))
    ; __append("\",\n")
    ;  }) 
    ; __append("\n)\n\ncookies <- list(\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\n  \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("\" = \"")
    ; __append(escapeFn( cookie.value ))
    ; __append("\",\n")
    ;  }) 
    ; __append("\n)\n\n")
    ;  if (method === 'GET') { 
    ; __append("\nreq <- getURL(url, httpheader = headers, cookie = cookies)\n")
    ;  } else { 
    ; __append("\nbody <- list(\n")
    ;  postData.forEach(param => { 
    ; __append("\n\"")
    ; __append(escapeFn( param.name ))
    ; __append("\" = ")
    ;  if (Array.isArray(param.value) || typeof param.value === 'object') { 
    ; __append("\n  ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(",\n")
    ;  } else { 
    ; __append("\n  \"")
    ; __append(escapeFn( param.value ))
    ; __append("\",\n")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n)\n\nreq <- postForm(url, .params = body, httpheader = headers, cookie = cookies)\n")
    ;  } 
    ; __append("\n\ncat(\"Response: \", \"\\n\")\ncat(req, \"\\n\")\n\n")
  return __output;

},
"r/httr": function anonymous(locals, escapeFn, include, rethrow
) {
"use strict";
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
    ;  const { url, method, mimeType, headers, postData, cookies } = locals; 
    ; __append("\nlibrary(httr)\n\nurl <- \"")
    ; __append(escapeFn( url ))
    ; __append("\"\n\nreq <- VERB(\"")
    ; __append(escapeFn( method ))
    ; __append("\", url)\n\n")
    ;  headers.forEach(header => { 
    ; __append("\nreq <- add_headers(\"")
    ; __append(escapeFn( header.name ))
    ; __append("\" = \"")
    ; __append(escapeFn( header.value ))
    ; __append("\", req)\n")
    ;  }) 
    ; __append("\n\n")
    ;  cookies.forEach(cookie => { 
    ; __append("\nreq <- add_headers(\"Cookie\" = \"")
    ; __append(escapeFn( cookie.name ))
    ; __append("=")
    ; __append(escapeFn( cookie.value ))
    ; __append("\", req)\n")
    ;  }) 
    ; __append("\n\n")
    ;  if (postData.length > 0) { 
    ; __append("\nbody <- list(\n")
    ;  postData.forEach(param => { 
    ; __append("\n\"")
    ; __append(escapeFn( param.name ))
    ; __append("\" = ")
    ;  if (Array.isArray(param.value) || typeof param.value === 'object') { 
    ; __append("\n    ")
    ; __append(escapeFn( JSON.stringify(param.value) ))
    ; __append(",\n")
    ;  } else { 
    ; __append("\n    \"")
    ; __append(escapeFn( param.value ))
    ; __append("\",\n")
    ;  } 
    ; __append("\n")
    ;  }) 
    ; __append("\n)\nreq <- content(req, as.formula(paste0(\"")
    ; __append(escapeFn( mimeType ))
    ; __append("\", \"()\")), body)\n")
    ;  } 
    ; __append("\n\nres <- content(req)\n\ncat(\"Response: \")\nprint(toJSON(res, pretty = TRUE))\n")
  return __output;

},
};

export default templates;

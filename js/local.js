if (localStorage.getItem("nu1") == null) {
    localStorage.setItem("nu1", "");
    localStorage.setItem("sc1", "0");
}
if (localStorage.getItem("nu2") == null) {
    localStorage.setItem("nu2", "");
    localStorage.setItem("sc2", "0");
}
if (localStorage.getItem("nu3") == null) {
    localStorage.setItem("nu3", "");
    localStorage.setItem("sc3", "0");
}
if (localStorage.getItem("nu4") == null) {
    localStorage.setItem("nu4", "");
    localStorage.setItem("sc4", "0");
}
if (localStorage.getItem("nu5") == null) {
    localStorage.setItem("nu5", "");
    localStorage.setItem("sc5", "0");
}
document.getElementById("scores").innerHTML="High scores:"+
                                            "<p>1. : "+localStorage.getItem("nu1")+" ("+localStorage.getItem("sc1")+")</p>"+
                                            "<p>2. : "+localStorage.getItem("nu2")+" ("+localStorage.getItem("sc2")+")</p>"+
                                            "<p>3. : "+localStorage.getItem("nu3")+" ("+localStorage.getItem("sc3")+")</p>"+
                                            "<p>4. : "+localStorage.getItem("nu4")+" ("+localStorage.getItem("sc4")+")</p>"+
                                            "<p>5. : "+localStorage.getItem("nu5")+" ("+localStorage.getItem("sc5")+")</p>";
//

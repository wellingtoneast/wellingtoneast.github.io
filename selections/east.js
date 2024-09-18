function addLAPopups() {
  $(".bi-1-circle-fill").attr("data-bs-toggle", "popover");
  $(".bi-2-circle-fill").attr("data-bs-toggle", "popover");
  $(".bi-1-circle-fill").attr("data-bs-trigger", "hover");
  $(".bi-2-circle-fill").attr("data-bs-trigger", "hover");
  $(".points-science").attr("title", "Science");
  $(".points-technology").attr("title", "Technology");
  $(".points-arts").attr("title", "Arts");
  $(".points-english").attr("title", "English");
  $(".points-maths").attr("title", "Maths");
  $(".points-pe").attr("title", "Health & PE");
  $(".points-languages").attr("title", "Languages");
  $(".points-socsci").attr("title", "Te ao Tangata");
  $(".points-teaomaori").attr("title", "Te ao Māori");
}

function addClosedCoursePopups() {
  $(".not-available + label").attr("data-bs-toggle", "popover");
  $(".not-available + label").attr("data-bs-trigger", "hover");
  $(".not-available + label").attr(
    "title",
    "This course is unavailable. Either it is full or it is no longer on offer. Please speak to the year level Dean if you have any questions."
  );
}

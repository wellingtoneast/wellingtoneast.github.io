function wegcverify() {
  // total number of points, handy to see if 10 subjects/20 points are selected
  var points = [];

  // this list holds the short Learning Area names (used across the html/css/js),
  // number of points currently selected for each, and full Learning Area name
  var subjects = [
    ["arts", 0, "Ngā Toi/The Arts"],
    ["languages", 0, "Ngā Reo/Languages"],
    ["science", 0, "Pūtaiao/Science"],
    ["technology", 0, "Hāngarau/Technology"],
    ["maths", 0, "Pāngarau/Maths"],
    ["english", 0, "Ingarihi/English"],
    ["socsci", 0, "Te ao Tangata"],
    ["pe", 0, "Akoranga Kōiri me Te Hauora/Health & PE"],
    ["teaomaori", 0, "Te ao Māori"],
  ];

  // gets the number of points from each selected subject
  $("input[type=checkbox]").each(function () {
    if (this.checked) {
      let buttonpoints = $(this).data("points");
      if (Object.keys(buttonpoints).length == 1) {
        // an intensive course
        points.push(Object.entries(buttonpoints)[0]);
      } else {
        // a connected course
        points.push(Object.entries(buttonpoints)[0]);
        points.push(Object.entries(buttonpoints)[1]);
      }
    }
  });
  console.log(points);
  // add up the number of points for each LA
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < subjects.length; j++) {
      if (points[i][0] == subjects[j][0]) {
        subjects[j][1] += parseInt(points[i][1]);
        break;
      }
    }
  }
  console.log(subjects);
  // This section validates the current choices against the rules for this year level.
  // It also builds the right-hand column, to communicate which conditions are satisfied.
  let total_points = 0;
  let summary_string = "";
  let points_share = 0;
  let points_within_range = true;
  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i][0] == "teaomaori" && subjects[i][1] == 0) {
      continue;
    }
    points_share = 0;

    // add up the number of points for each subject
    total_points += subjects[i][1];

    // check if there are between 2 and 3 points allocated for each LA
    // if (subjects[i][0] != "languages") {
    if (subjects[i][1] < 2) {
      // if (subjects[i][0] != "teaomaori") {
      points_within_range = false;
      points_share = 1;
      // }
    } else if (subjects[i][1] > 3) {
      points_within_range = false;
      points_share = 2;
    }
    // }

    // build the right-most column summarising if all of the conditions have been met
    summary_string += "<p class='summary-";
    summary_string += subjects[i][0];
    summary_string += "'>";
    if (points_share == 1) {
      summary_string +=
        "<i class='bi bi-arrow-up-circle text-danger p-2' data-bs-toggle='popover' data-bs-trigger='hover' title='Not enough points for this LA'></i> ";
    } else if (points_share == 2) {
      summary_string +=
        "<i class='bi bi-arrow-down-circle text-danger p-2' data-bs-toggle='popover' data-bs-trigger='hover' title='Too many points for this LA, should be 2-3'></i> ";
    } else {
      summary_string += "<i class='bi bi-check-circle text-success p-2'></i> ";
    }
    summary_string += subjects[i][2];
    summary_string += ": ";
    summary_string += "<i class='bi bi-circle-fill'></i> ".repeat(
      subjects[i][1]
    );
    summary_string += "</p>\n";
  }
  $("#summary-card .card-text").html(summary_string);

  let conditions_summary = "";
  let course_count = false;
  let points_count = false;
  if (total_points == 20) {
    conditions_summary +=
      "<p><i class='bi bi-check-circle-fill text-success'></i> You have selected 10 courses.</p>";
    course_count = true;
  } else {
    let num_courses_selected = total_points / 2;
    conditions_summary += `<p><i class='bi bi-exclamation-circle-fill text-danger'></i> You have selected ${num_courses_selected} courses.</p>`;
  }
  if (points_within_range) {
    conditions_summary +=
      "<p><i class='bi bi-check-circle-fill text-success'></i> Each LA has between 2 and 3 points.</p>";
    points_count = true;
  } else {
    conditions_summary +=
      "<p><i class='bi bi-exclamation-circle-fill text-danger'></i> At least one LA has less than 2 or more than 3 points.</p>";
  }
  if (course_count && points_count) {
    $("#summary-card").addClass("border-success");
    $("#summary-card").removeClass("bg-warning-subtle");
    $("#summary-card").addClass("bg-success-subtle");
  } else {
    $("#summary-card").removeClass("border-success");
    $("#summary-card").removeClass("bg-success-subtle");
    $("#summary-card").addClass("bg-warning-subtle");
  }
  $("#summary-card .card-title").html(conditions_summary);
}

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

$(document).ready(function () {
  // add little popups with short LA names to the points bubbles
  addLAPopups();

  // call the verify function once the page loads
  wegcverify();

  // then call the verify function each time a subject is chosen/unchosen
  $(".form-check-input").change(function () {
    wegcverify();
  });

  // this disables further selections once 10 subjects are chosen
  // comment/remove this if this isn't the desired behaviour
  $("form").on("click", ":checkbox", function (event) {
    $(":checkbox:not(:checked)", this.form).prop("disabled", function () {
      return $(this.form).find(":checkbox:checked").length == 10;
    });
  });
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
});

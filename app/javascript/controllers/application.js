import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

$(document).ready(function () {
  var flip1 = 0;
  var flip2 = 0;
  $(document).on("click", ".add-form-comment-btn", function () {
    var html = $(".comment-form").html();
    $("#micropost-" + $(this).data("micropost-id")).append(html);
    $(".input-comment").toggle(flip1++ % 2 === 0);
  });

  $(document).on("click", ".add-form-reply-btn", function () {
    var html2 = $(".reply-form").html();
    $("#replies-" + $(this).data("comment-id")).append(html2);
    $(".input-reply").toggle(flip2++ % 2 === 0);
  });

  $(document).on("click", ".comment-submit", function () {
    var micropostId = $(this).closest(".microposts").data("id");
    var commentContent = $(this).siblings(".comment-content").val();

    $.ajax({
      url: "/comments",
      type: "POST",
      data: {
        comment: {
          micropost_id: micropostId,
          comment_content: commentContent,
        },
      },
      dataType: "JSON",
      success: function (data) {
        location.reload();
      },
    });
  });

  $(document).on("click", ".reply-submit", function () {
    var commentId = $(this).closest(".comments").data("id");
    var replyContent = $(this).siblings(".reply-content").val();

    $.ajax({
      url: "/comments",
      type: "POST",
      data: {
        comment: {
          parent_id: commentId,
          comment_content: replyContent,
        },
      },
      dataType: "JSON",
      success: function (data) {
        location.reload();
      },
    });
  });
});
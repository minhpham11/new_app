import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

$(document).ready(function () {
    var flip = 0;

    $(document).on('click', '.add-form-comment-btn', function () {
        var html = $('.comment-form').html();
        $('#micropost-' + $(this).data('micropost-id')).append(html);
        $('.input-comment').toggle(flip++ % 2 === 0);
    });

    $(document).on('click', '.comment-btn', function () {
        var micropostId = $(this).closest('.micropost').data('id');

        var content = $(this).siblings('.comment-content').val();

        $.ajax({
            url: '/comments',
            type: 'POST',
            data: {
                comment: {
                    micropost_id: micropostId,
                    comment_content: content
                }
            },
            dataType: 'json',
            success: function (data) {
                appendText(data.comment.comment_content, micropostId);
            }
        })
    });

    function appendText(text, micropostId) {
        var txt1 = "<p>" + text + "</p>";
        $('.comments-' + micropostId).append(txt1);
    }
});



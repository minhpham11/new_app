import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }



$( document ).ready(function() {
    $('.add-form-comment-btn').click(function () {
        var html = $('.comment-form').html();
        $('#micropost-' + $(this).data('post-id')).append(html);
    });
    
    $('.comment-submit').click(function () {
        var form = $(this).closest('.comment-form');
        var formData = form.serialize();
        var url = form.attr('action');
        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            success: function (data) {
                $('.comment-form').remove();
                $('.comment-list').append(data);
            }
        });
    });
});

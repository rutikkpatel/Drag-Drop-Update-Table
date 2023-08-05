console.log("Hello World")

document.addEventListener('DOMContentLoaded', () => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const initSortable = () => {
    $('#events-table tbody').sortable({
      update: (event, ui) => {
        // Send an AJAX request to update the priorities on the server
        const eventOrder = $('#events-table tbody tr').map((index, element) => ({
          id: $(element).data('event-id'),
          priority: index + 1
        })).get();

        $.ajax({
          url: '/events/update_order',
          method: 'PATCH',
          data: { events: eventOrder },
          headers: {
            'X-CSRF-Token': csrfToken
          },
        });
      }
    });
  };

  // Initialize sortable on page load
  initSortable();

  // Reinitialize sortable after a Turbo visit to retain the behavior on page reloads
  document.addEventListener('turbo:load', initSortable);
});

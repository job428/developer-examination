let endpoint = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', function () {
    // Initialize DataTable
    $('#itemTable').DataTable();

    // Fetch and render data in the table
    renderTable();

    // Handle item click to open the modal
    $('#itemTable tbody').on('click', 'tr', function () {
        const table = $('#itemTable').DataTable();
        const data = table.row(this).data(); // Use DataTable's API to get row data

        if (data) {
            // Check if data is defined
            const itemId = data[0]; // Assuming the ID is in the first column
            openViewModal(itemId);
        }
    });

    // Handle item click to open the Edit modal

    $('#itemTable tbody').on('click', 'button.btn-primary', function () {
        const table = $('#itemTable').DataTable();
        const data = table.row($(this).closest('tr')).data(); // Use DataTable's API to get row data

        if (data) {
            // Check if data is defined
            const itemId = data[0];
            const itemName = data[1];
            const itemPrice = data[2];
            const itemQuantity = data[3];
            const itemDescription = data[4];
            console.log('data')
            console.log(data)
            const editModal = $('#editItemModal');
            editModal.find('#editItemId').val(itemId);
            editModal.find('#editName').val(itemName);
            editModal.find('#editPrice').val(itemPrice);
            editModal.find('#editQuantity').val(itemQuantity);
            editModal.find('#editDescription').val(itemDescription);
            editModal.modal('show');
        }
    });


});

const openEditModal = (itemId) => {
    // Fetch item details by ID from the API using the fetch API
    fetch(endpoint + '/get_item_by_id?_id=' + itemId)
        .then(response => response.json())
        .then(data => {
            // Populate the edit modal with item details
            if (data.status === 'success') {
                const item = data.data;
                const editModal = $('#editItemModal');
                editModal.find('#editItemId').val(item._id);
                editModal.find('#editName').val(item.name);
                editModal.find('#editPrice').val(item.price);
                editModal.find('#editQuantity').val(item.quantity);
                editModal.find('#editDescription').val(item.description);
                editModal.modal('show');
            }
        })
        .catch(error => {
            console.error('Error fetching item details:', error);
        });
};

const renderTable = () => {
    // Fetch data from the API using the fetch API
    fetch(endpoint + '/get_item')
        .then(response => response.json())
        .then(data => {
            // Render data in the table
            if (data.status === '200') {
                const items = data.data;
                const table = $('#itemTable').DataTable();
                table.clear().draw();
                items.forEach(item => {

                    const EditButton = '<button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#editItemModal" >Edit</button>';
                    // const DeleteButton = '<button class="btn btn-danger">Delete</button>';
                    table.row.add([item._id, item.name, item.price, item.quantity, item.description, EditButton]).draw();
                });
                var Lasttable = document.getElementById('itemTable');
                Lasttable.dataset.pageLast = true;
                if (Lasttable.dataset.pageLast === 'true') {
                    var dataTable = $(Lasttable).DataTable();
                    var lastPage = Math.floor(dataTable.rows().count() / dataTable.page.len());
                    dataTable.page(lastPage).draw(false);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

const insertItem = () => {
    // Send a POST request to insert item data
    var name = document.getElementById("name").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;
    var description = document.getElementById("description").value;

    let JsonData = JSON.stringify({
        name: name,
        price: price,
        quantity: quantity,
        description: description,
    })
    fetch(endpoint + '/insert_item', {
        method: 'POST',
        body: JsonData,
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json())
        .then(data => {
            // Handle the response from the server (e.g., show success message)
            console.log('data')
            console.log(data)
            if (data.status === '200') {
                alert('Item inserted successfully');
                $("#itemModal").modal("hide");
                clearModalInsert()
                renderTable()

                // Optionally, you can clear the form or update the table
            } else {
                alert('Failed to insert item: ' + JSON.stringify(data));
            }
        })
        .catch(error => {
            console.error('Error inserting item:', error);
        });
};

// Function to clear input fields in the modal
const clearModalInsert = () => {
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('description').value = '';
}

// Function to clear input fields in the modal
const clearModalEdit = () => {
    document.getElementById('editItemId').value = '';
    document.getElementById('editName').value = '';
    document.getElementById('editPrice').value = '';
    document.getElementById('editQuantity').value = '';
    document.getElementById('editDescription').value = '';
}


const updateItem = (itemId, formData) => {
    // Send a POST request to update item data by id
    var id = document.getElementById("editItemId").value;
    var name = document.getElementById("editName").value;
    var price = document.getElementById("editPrice").value;
    var quantity = document.getElementById("editQuantity").value;
    var description = document.getElementById("editDescription").value;
    let JsonData = JSON.stringify({
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        description: description,
    })
    console.log('JsonData')
    console.log(JsonData)
    fetch(endpoint + '/update_item', {
        method: 'POST',
        body: JsonData,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server (e.g., show success message)
            if (data.status === '200') {
                alert('Item updated successfully');
                $("#editItemModal").modal("hide");
                clearModalEdit()
                renderTable()
                // Optionally, you can clear the form or update the table
            } else {
                alert('Failed to update item');
            }
        })
        .catch(error => {
            console.error('Error updating item:', error);
        });
};

const openViewModal = (itemId) => {
    // Fetch item details by ID from the API using the fetch API
    fetch(endpoint + '/get_item_by_id?_id=' + itemId)
        .then(response => response.json())
        .then(data => {
            // Populate the modal with item details
            if (data.status === 'success') {
                const item = data.data;
                const modal = $('#viewItemModal');
                modal.find('.modal-body').html('<pre>' + JSON.stringify(item, null, 2) + '</pre>');
                modal.modal('show');
            }
        })
        .catch(error => {
            console.error('Error fetching item details:', error);
        });
};
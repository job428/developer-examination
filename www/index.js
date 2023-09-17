let endpoint = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', function () {
    $('#itemTable').DataTable();

    renderTable();

    // Handle item click to open the modal
    $('#itemTable tbody').on('click', 'tr', function () {
        const table = $('#itemTable').DataTable();
        const data = table.row(this).data(); 

        if (data) {
            // Check if data is defined
            const itemId = data[0]; 
            openViewModal(itemId);
        }
    });

    // Handle item click to open the Edit modal
    $('#itemTable tbody').on('click', 'button.btn-primary', function () {
        const table = $('#itemTable').DataTable();
        const data = table.row($(this).closest('tr')).data(); 

        if (data) {
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
    fetch(endpoint + '/get_item_by_id?_id=' + itemId)
        .then(response => response.json())
        .then(data => {
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
    fetch(endpoint + '/get_item')
        .then(response => response.json())
        .then(data => {
            if (data.status === '200') {
                const items = data.data;
                const table = $('#itemTable').DataTable();
                table.clear().draw();
                items.forEach(item => {

                    const EditButton = '<button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#editItemModal" >Edit</button>';
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
            console.log('data')
            console.log(data)
            if (data.status === '200') {
                alert('Item inserted successfully');
                $("#itemModal").modal("hide");
                clearModalInsert()
                renderTable()

            } else {
                alert('Failed to insert item: ' + JSON.stringify(data));
            }
        })
        .catch(error => {
            console.error('Error inserting item:', error);
        });
};

// Function to clear input fields in the clearModalInsert
const clearModalInsert = () => {
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('description').value = '';
}

// Function to clear input fields in the clearModalEdit
const clearModalEdit = () => {
    document.getElementById('editItemId').value = '';
    document.getElementById('editName').value = '';
    document.getElementById('editPrice').value = '';
    document.getElementById('editQuantity').value = '';
    document.getElementById('editDescription').value = '';
}


const updateItem = (itemId, formData) => {
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
            if (data.status === '200') {
                alert('Item updated successfully');
                $("#editItemModal").modal("hide");
                clearModalEdit()
                renderTable()
            } else {
                alert('Failed to update item');
            }
        })
        .catch(error => {
            console.error('Error updating item:', error);
        });
};

const openViewModal = (itemId) => {
    fetch(endpoint + '/get_item_by_id?_id=' + itemId)
        .then(response => response.json())
        .then(data => {
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
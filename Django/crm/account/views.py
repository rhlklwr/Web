from django.db.models.query import QuerySet
from django.shortcuts import render, redirect
# from django.http import HttpResponse
from .forms import OrderForm
from django.forms import inlineformset_factory
from .models import *
from .filters import OrderFilter


def home(request):
    orders = Order.objects.all()
    customers = Customer.objects.all()

    total_customers = customers.count()
    total_orders = orders.count()
    delivered = orders.filter(status='Delivered').count()
    pending = orders.filter(status='Pending').count()

    context = {'orders': orders, 'customers': customers,
               'total_customers': total_customers, 'total_orders': total_orders,
               'delivered': delivered, 'pending': pending}
    return render(request, 'account/dashboard.html', context)


def products(request):
    products = Product.objects.all()
    return render(request, 'account/products.html', {'products': products})


def customers(request, id):
    customer = Customer.objects.get(id=id)
    orders = customer.order_set.all()
    order_count = orders.count()
    
    myFilter = OrderFilter(request.GET, queryset=orders)
    orders = myFilter.qs

    context = {'customer': customer, 'orders': orders,
               'order_count': order_count, 'myFilter':myFilter}
    return render(request, 'account/customers.html', context)


def createOrder(request, id):
    OrderFormSet = inlineformset_factory(
        Customer, Order, fields=('product', 'status'), extra=5)
    customer = Customer.objects.get(id=id)
    formset = OrderFormSet(instance=customer, queryset=Order.objects.none())
    # form = OrderForm(initial={'customer':customer})
    if request.method == 'POST':
        # print("Printing POST: ",request.POST)
        # form = OrderForm(request.POST)
        formset = OrderFormSet(request.POST, instance=customer)
        if formset.is_valid():
            formset.save()
            return redirect('/')
    context = {'formset': formset}
    return render(request, 'account/order_form.html', context)


def updateOrder(request, id):

    order = Order.objects.get(id=id)
    form = OrderForm(instance=order)

    if request.method == 'POST':
        form = OrderForm(request.POST, instance=order)
        if form.is_valid():
            form.save()
            return redirect('/')

    context = {'form': form}
    return render(request, 'account/order_form.html', context)


def deleteOrder(request, id):

    order = Order.objects.get(id=id)

    if request.POST:
        order.delete()
        return redirect('/')
    context = {'item': order}
    return render(request, 'account/delete.html', context)

class ItemsController < ApplicationController

    def create 
        item = Item.create!(item_params)

        render json: item, status: :created
    end

    # TODO: figure out how to prevent duplication when item is created by user

    # remind issue::  when an item is created by the user if the item matches another item it will still be created. i set up a validation but it dosnt seem to work maybe?? the goal is when a user tries to create an item that exist it should not create a new item only update the create a user_item to build the association. this will then be used to update user_items on the front end but another conflict will be not updating the items when the request is sent back to the front end.

    # Update:: have some what solved problem described above but i need to make sure that it is thorugholy tested as well as add a means to prevent users form creating a user_item that is associated with an existing item with the same experation date if a user wants to doplicate a item they need to have a diffrent experation. also i need to test the second user with no user_items

    # def create 
    #     item = @current_user.items.find_or_create_by(item_params)
    #     user_item = @current_user.user_items.find_by(item_id: item)
    #     user_item.update(user_item_params)

    #     render json: user_item,  status: :created
    # end

    # def create 
    #     item = Item.find_by(name: params[:name])
    #     if item
    #         user_item = @current_user.user_items.create(item_id: item.id)
    #         user_item.update(user_item_params)
    #         render json: user_item, status: :created
    #     else
    #         new_item = @current_user.items.create(item_params)
    #         user_item = @current_user.user_items.find_by(item_id: new_item.id)
    #         user_item.update(user_item_params)
    #         render json: user_item, status: :created
    #     end
    # end

    def show
        item = Item.find(params[:id])

        render json: item, status: :ok
    end

    def index 
        render json: Item.all, status: :ok
    end

    private

    def item_params
        params.permit(:id, :name, :category, :image_url, :sku, :description)
    end

    # def user_item_params
    #     params.permit(:experation_date, :quantity)
    # end
end

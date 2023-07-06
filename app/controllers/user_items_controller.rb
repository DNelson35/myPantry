class UserItemsController < ApplicationController

    def index 
        user_items = @current_user.user_items.all

        render json: user_items, status: :ok
    end

    def show 
        user_item = find_user_item

        render json: user_item, status: :found
    end


    def create 
        item = Item.find_by(name: params[:name])
        if item
            user_item = create_user_item(item)
            render json: user_item, status: :created
        else
            new_item = Item.create(item_params)
            user_item = create_user_item(new_item)
            render json: user_item, serializer: UserItemWithExtraAttributesSerializer, status: :created
        end
    end

    def update
        user_item = find_user_item
        user_item.update!(user_item_params)
        user_item.save
        render json: user_item, serializer: UserItemWithExtraAttributesSerializer, status: :accepted
    end

# TODO: IMPORTANT: Add an update method so that the user can update the user_item

    def destroy
        user_item = find_user_item

        user_item.destroy

        head :no_content
    end



    private

    def find_user_item
        UserItem.find(params[:id])
    end

    def item_params
        params.permit(:name, :category, :description)
    end

    def user_item_params
        params.permit(:id, :expiration_date, :quantity)
    end

    def create_user_item (item)
        @current_user.user_items.create!(item_id: item.id, expiration_date: params[:expiration_date], quantity: params[:quantity])
    end
end

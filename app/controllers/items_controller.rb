class ItemsController < ApplicationController

    def create 
        item = Item.create!(item_params)

        render json: item, status: :created
    end

    # TODO: Important:: Need to set up validations so that a user_item can not be duplicated with the name experation_date and name. if the item is already in the user_items it needs to have a different experation to be created. 

    # TODO: Important:: need to make sure that when the item is submitted to the backend the capitalization matches the style of the backend. all of the items front in back should match when created or searched for. This will help prevent duplicates as well.  
    # (POSIBLE SOLUSTIONS:) I could have an toUpperCase attached to the form input so that all names sent to the backend are Caplitalized. then to insure that items are being found correctly on the backend i can set up a toUpperCase on the params for name and the results from the find like this: item = Item.find_by("LOWER(name) = ?", params[:name].downcase) # Case-insensitive search in the user_items controler.


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
end

class ItemsController < ApplicationController

    def create 
        item = Item.create!(item_params)

        render json: item, status: :created
    end

    def show
        item = Item.find(params[:id])

        render json: item, status: :ok
    end

    def index 
        render json: Item.all, status: :ok
    end

    private

    def item_params
        params.permit(:id, :name, :category, :description)
    end
end

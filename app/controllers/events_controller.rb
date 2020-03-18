require 'pry'

class EventsController < ApplicationController
  def index
    @events = Event.all
    render json: @events
  end

  def create
    binding.pry
    event = Event.create!(event_params)
  end

  def show
    @event = Event.find(params[:id])
    render json: @event
  end

  def event_params 
    params.require(:event).permit(:date, :title, :owner)
  end
end
